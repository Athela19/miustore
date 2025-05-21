import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return new Response(JSON.stringify({ error: "Semua field wajib diisi." }), {
                status: 400,
            });
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return new Response(JSON.stringify({ error: "Email atau password salah." }), {
                status: 400,
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return new Response(JSON.stringify({ error: "Email atau password salah." }), {
                status: 400,
            });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return new Response(JSON.stringify({ message: "Login berhasil" }), {
            status: 200,
            headers: {
                "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict`,
                "Content-Type": "application/json"
            }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
}
