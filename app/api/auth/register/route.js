import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return new Response(JSON.stringify({ error: "Semua field wajib diisi." }), {
                status: 400,
            });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return new Response(JSON.stringify({ error: "Email sudah terdaftar." }), {
                status: 400,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                profile: null,
            },
        });

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        const cookie = `token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=604800${
            process.env.NODE_ENV === "production" ? "; Secure" : ""
        }`;

        const { password: _, ...userWithoutPassword } = user;

        return new Response(JSON.stringify(userWithoutPassword), {
            status: 201,
            headers: {
                "Set-Cookie": cookie,
                "Content-Type": "application/json",
            },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
}
