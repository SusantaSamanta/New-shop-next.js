//  PATCH   /api/admin/product/:id
//  DELETE   /api/admin/product/:id
/// GET    /api/admin/product/:id

import { requireAdmin } from "@/lib/auth/requireAdmin";
import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"


export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    const admin = await requireAdmin(request);
    if (!admin.success) {
        return NextResponse.json(
            { success: false, message: admin.message },
            { status: admin.status }   // 401 if not logged in, 403 if not ADMIN
        );
    }

    try {
        const { id } = await params;
        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Product id require."
                },
                { status: 404 },
            )
        }
        const prisma = new PrismaClient();
        const product = await prisma.products.findUnique({
            where: {
                id
            }
        })
        if (!product) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Product not found"
                },
                { status: 404 },
            )
        }
        return NextResponse.json(
            {
                success: true,
                message: "Product found",
                product
            },
            { status: 200 },
        )

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                success: false,
                message: "Server error"
            },
            { status: 404 },
        )
    }
}


// patch: /api/admin/product/:id
// Update fields matching by id
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const admin = await requireAdmin(request);
    if (!admin.success) {
        return NextResponse.json(
            { success: false, message: admin.message },
            { status: admin.status }
        );
    }

    try {
        const { id } = await params;
        if (!id) return NextResponse.json({ success: false, message: "Id required" }, { status: 400 });

        const prisma = new PrismaClient();

        const product = await prisma.products.findUnique({
            where: {
                id
            }
        });

        if (!product) return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });

        let body;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json({ success: false, message: "Invalid JSON body" }, { status: 400 });
        }

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

        if (
            name === undefined &&
            slug === undefined &&
            shortDescription === undefined &&
            description === undefined &&
            categories === undefined &&
            subcategories === undefined &&
            mrp === undefined &&
            sellingPrice === undefined &&
            tax === undefined &&
            weight === undefined &&
            unit === undefined &&
            shelfLife === undefined &&
            country === undefined &&
            thumbnail === undefined &&
            galleryImages === undefined &&
            isActive === undefined
        ) {
            return NextResponse.json(
                { success: false, message: "Nothing to update. Send at least one field." },
                { status: 400 }
            );
        }

        /// Check that name already exist or not ?
        if (name !== undefined && name !== product.name) {
            const existingName = await prisma.products.findFirst({
                where: { name, NOT: { id } },
            });
            if (existingName) {
                return NextResponse.json(
                    { success: false, message: "Product name already exists." },
                    { status: 409 }
                );
            }
        }

        /// Check that slug already exist or not ?
        if (slug !== undefined && slug !== product.slug) {
            const existingSlug = await prisma.products.findFirst({
                where: { slug, NOT: { id } },
            });
            if (existingSlug) {
                return NextResponse.json(
                    { success: false, message: "Product slug already exists." },
                    { status: 409 }
                );
            }
        }

        const updatedProduct = await prisma.products.update({
            where: { id },
            data: {
                ...(name !== undefined && { name }),
                ...(slug !== undefined && { slug }),
                ...(shortDescription !== undefined && { shortDescription }),
                ...(description !== undefined && { description }),
                ...(categories !== undefined && { categories }),
                ...(subcategories !== undefined && { subcategories }),
                ...(mrp !== undefined && { mrp }),
                ...(sellingPrice !== undefined && { sellingPrice }),
                ...(tax !== undefined && { tax }),
                ...(weight !== undefined && { weight }),
                ...(unit !== undefined && { unit }),
                ...(shelfLife !== undefined && { shelfLife }),
                ...(country !== undefined && { country }),
                ...(thumbnail !== undefined && { thumbnail }),
                ...(galleryImages !== undefined && { galleryImages }),
                ...(isActive !== undefined && { isActive }),
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Product updated successfully.",
                product: updatedProduct
            },
            { status: 200 },
        );

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}


// delete: /api/admin/product/:id

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const admin = await requireAdmin(request);
    if (!admin.success) {
        return NextResponse.json(
            { success: false, message: admin.message },
            { status: admin.status }
        );
    }

    try {
        const { id } = await params;
        if (!id) return NextResponse.json({ success: false, message: "Id required" }, { status: 400 });

        const prisma = new PrismaClient();

        const product = await prisma.products.findUnique({
            where: {
                id
            }
        });

        if (!product) return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });

        await prisma.products.delete({
            where: { id }
        });

        return NextResponse.json(
            {
                success: true,
                message: "Product deleted successfully."
            },
            { status: 200 }
        );

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}