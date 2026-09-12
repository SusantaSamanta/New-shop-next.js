import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function requireAdmin(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
        return {
            success: false,
            status: 401,
            message: "Unauthorized",
        };
    }

    if (token.role !== "ADMIN") {
        return {
            success: false,
            status: 403,
            message: "Forbidden",
        };
    }

    return {
        success: true,
        user: token,
    };
}