// GET    /api/categories/:id

import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Category id required."
                },
                { status: 400 },
            )
        }
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
                { status: 404 },
            )
        }
        return NextResponse.json(
            {
                success: true,
                message: "Category found",
                category
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