// GET    /api/admin/categories/stats

import { requireAdmin } from "@/lib/auth/requireAdmin";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const admin = await requireAdmin(request);
        if (!admin.success) {
            return NextResponse.json(
                { success: false, message: admin.message },
                { status: admin.status }
            );
        }

        const prisma = new PrismaClient();
        const [total, active, inactive] = await Promise.all([
            prisma.categories.count(),
            prisma.categories.count({ where: { isActive: true } }),
            prisma.categories.count({ where: { isActive: false } }),
        ]);

        return NextResponse.json(
            {
                success: true,
                message: "Category stats fetched successfully.",
                stats: { total, active, inactive },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error." },
            { status: 500 }
        );
    }
}