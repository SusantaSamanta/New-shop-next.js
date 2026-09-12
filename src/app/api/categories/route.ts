// GET    /api/categories

import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

// export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
export async function GET(request: NextRequest, params: any) {
    try {
        const { id } = await params;
        const prisma = new PrismaClient();
        const category = await prisma.categories.findUnique({
            where: {
                id 
            }
        })
        if (!category) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Category not found"
                },
                {status: 404},
            )
        }

    } catch (error) {

    }
}

