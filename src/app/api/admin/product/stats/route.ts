// GET    /api/admin/product/stats

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

        // Products added within the last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const [total, active, inactive, recentlyAdded] = await Promise.all([
            prisma.products.count(),
            prisma.products.count({ where: { isActive: true } }),
            prisma.products.count({ where: { isActive: false } }),
            prisma.products.count({
                where: {
                    createdAt: { gte: thirtyDaysAgo },
                },
            }),
        ]);

        return NextResponse.json(
            {
                success: true,
                message: "Product stats fetched successfully.",
                stats: { total, active, inactive, recentlyAdded },
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