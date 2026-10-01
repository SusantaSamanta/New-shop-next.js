/// POST   /api/admin/product
/// GET    /api/admin/product

import { requireAdmin } from "@/lib/auth/requireAdmin";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

/// POST   /api/admin/product
export const POST = async (req: NextRequest) => {
    try {
        const admin = await requireAdmin(req);
        if (!admin.success) {
            return NextResponse.json(
                { message: admin.message },
                { status: admin.status }
            );
        }

        const body = await req.json();
        const prisma = new PrismaClient();
        const {
            name,
            slug,
            shortDescription,
            description,
            categories,
            subcategories,
            mrp,
            sellingPrice,
            tax,
            weight,
            unit,
            shelfLife,
            country,
            thumbnail,
            galleryImages,
            isActive,
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

        // Check duplicate name
        const existingName = await prisma.products.findUnique({
            where: {
                name,
            },
        });

        if (existingName) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Product name already exists.",
                },
                { status: 409 }
            );
        }

        // Check duplicate slug
        const existingSlug = await prisma.products.findUnique({
            where: {
                slug,
            },
        });

        if (existingSlug) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Product slug already exists.",
                },
                { status: 409 }
            );
        }

        const product = await prisma.products.create({
            data: {
                name,
                slug,
                shortDescription,
                description,
                categories,
                subcategories,
                mrp,
                sellingPrice,
                tax: tax ?? 0,
                weight,
                unit,
                shelfLife,
                country,
                thumbnail,
                galleryImages,
                isActive: isActive ?? true,
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Product created successfully.",
                product,
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
};