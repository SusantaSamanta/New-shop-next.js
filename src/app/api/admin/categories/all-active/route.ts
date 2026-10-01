import { requireAdmin } from "@/lib/auth/requireAdmin";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse as res } from "next/server";

async function wait() {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
}
// get: /api/admin/categories/all-active
export async function GET(request: NextRequest) {
    const admin = await requireAdmin(request);
    if (!admin.success) {
        return res.json(
            { success: false, message: admin.message },
            { status: admin.status }
        );
    }
await wait()
    try {

        const prisma = new PrismaClient();

        const categories = await prisma.categories.findMany({
            where: { isActive: true },
            select: { id: true, name: true, slug: true },
            orderBy: {name: "asc"}
        });

        if (!categories) {
            return res.json(
                { success: false, message: "No category exist." },
                { status: 200 }
            );
        }
        
        return res.json(
            { success: true, categories },
            { status: 200 }
        );




    } catch (error) {
        console.error(error);
        return res.json(
            { success: false, message: "Internal Server Error." },
            { status: 500 }
        );
    }


}