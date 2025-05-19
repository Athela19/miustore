import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
    try {
        const userId = await params;
        const id = Number(userId.id);

        if (!id || isNaN(id)) {
            return new Response(JSON.stringify({ error: "ID tidak valid." }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                profile: true, // pastikan ini ada di schema.prisma
            },
        });

        if (!user) {
            return new Response(JSON.stringify({ error: "User tidak ditemukan." }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify(user), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("Terjadi error saat mengambil user:", error);
        return new Response(JSON.stringify({ error: "Terjadi kesalahan server." }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
