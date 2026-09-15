// GET    /api/categories

import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const prisma = new PrismaClient();
        const categories = await prisma.categories.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })

        return NextResponse.json(
            {
                success: true,
                message: categories.length ? "Categories found" : "No categories found",
                categories
            },
            { status: 200 },
        )
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            {
                success: false,
                message: "Server error"
            },
            { status: 500 },
        )
    }
}