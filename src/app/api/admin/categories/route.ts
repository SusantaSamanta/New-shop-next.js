/// POST   /api/admin/categories
/// GET    /api/admin/categories


import { requireAdmin } from "@/lib/auth/requireAdmin";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

/// POST   /api/admin/categories
export async function POST(request: NextRequest) {
    try {

        const admin = await requireAdmin(request);
        if (!admin.success) {
            return NextResponse.json(
                { message: admin.message },
                { status: admin.status }
            );
        }


        const body = await request.json();
        const prisma = new PrismaClient();
        const {
            name,
            slug,
            description,
            image,
            isActive,
            // sortOrder,
        } = body;

        // Validation
        if (!name || !slug) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Name and Slug are required.",
                },
                { status: 400 }
            );
        }

        // Check duplicate name           || delete from categories where "slug"='aaa';
        const existingName = await prisma.categories.findUnique({
            where: {
                name,
            },
        });

        if (existingName) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Category name already exists.",
                },
                { status: 409 }
            );
        }

        // Check duplicate slug
        const existingSlug = await prisma.categories.findUnique({
            where: {
                slug,
            },
        });

        if (existingSlug) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Category slug already exists.",
                },
                { status: 409 }
            );
        }

        const category = await prisma.categories.create({
            data: {
                name,
                slug,
                description,
                image,
                isActive: isActive ?? true,
                // sortOrder: sortOrder ?? 0,
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Category created successfully.",
                data: category,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error.",
            },
            { status: 500 }
        );
    }
}



/// GET   /api/admin/categories
export async function GET(request: NextRequest) {
    try {
        const admin = await requireAdmin(request);
        if (!admin.success) {
            return NextResponse.json(
                { message: admin.message },
                { status: admin.status }
            );
        }
        const prisma = new PrismaClient()
        const categories = await prisma.categories.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        if (!categories) {
            return NextResponse.json(
                {
                    success: false,
                    message: "No categories found.",
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Category created successfully.",
                categories,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error.",
            },
            { status: 500 }
        );
    }
}
