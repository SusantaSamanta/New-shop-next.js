//  PATCH   /api/admin/product/:id
//  DELETE   /api/admin/product/:id
/// GET    /api/admin/product/:id

import { requireAdmin } from "@/lib/auth/requireAdmin";
import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

/// Normalizes a value that may arrive as an array or a comma separated string
const toStringArray = (value: unknown): string[] => {
    if (Array.isArray(value)) {
        return value.map((item) => String(item).trim()).filter(Boolean);
    }
    if (typeof value === "string") {
        return value
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
    }
    return [];
};

// Keeps empty optional strings as null so the optional columns stay null
const toNullableText = (value: unknown): string | null => {
    if (typeof value !== "string") return null;
    const trimmed = value.trim();
    return trimmed ? trimmed : null;
};

const toNumber = (value: unknown): number => {
    const parsed = typeof value === "number" ? value : parseFloat(String(value));
    return Number.isFinite(parsed) ? parsed : 0;
};


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

        let body: Record<string, unknown>;
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

        const nameText = toNullableText(name);
        const slugText = toNullableText(slug);

        // Required text columns must never be blanked out by a partial update
        const requiredText = [
            { key: "weight", value: weight },
            { key: "unit", value: unit },
            { key: "shelfLife", value: shelfLife },
            { key: "country", value: country },
        ]
            .filter((item) => item.value !== undefined)
            .map((item) => ({ ...item, text: toNullableText(item.value) }))
            .filter((item) => !item.text)
            .map((item) => item.key);

        if (requiredText.length > 0) {
            return NextResponse.json(
                { success: false, message: `${requiredText.join(", ")} cannot be empty.` },
                { status: 400 }
            );
        }

        if (categories !== undefined && toStringArray(categories).length === 0) {
            return NextResponse.json(
                { success: false, message: "Select at least one category." },
                { status: 400 }
            );
        }

        /// Check that name already exist or not ?
        if (nameText && nameText !== product.name) {
            const existingName = await prisma.products.findFirst({
                where: { name: nameText, NOT: { id } },
            });
            if (existingName) {
                return NextResponse.json(
                    { success: false, message: "Product name already exists." },
                    { status: 409 }
                );
            }
        }

        /// Check that slug already exist or not ?
        if (slugText && slugText !== product.slug) {
            const existingSlug = await prisma.products.findFirst({
                where: { slug: slugText, NOT: { id } },
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
                ...(nameText !== null && { name: nameText }),
                ...(slugText !== null && { slug: slugText }),
                ...(shortDescription !== undefined && { shortDescription: toNullableText(shortDescription) }),
                ...(description !== undefined && { description: toNullableText(description) }),
                ...(categories !== undefined && { categories: toStringArray(categories) }),
                ...(subcategories !== undefined && { subcategories: toStringArray(subcategories) }),
                ...(mrp !== undefined && { mrp: toNumber(mrp) }),
                ...(sellingPrice !== undefined && { sellingPrice: toNumber(sellingPrice) }),
                ...(tax !== undefined && { tax: toNumber(tax) }),
                ...(weight !== undefined && { weight: toNullableText(weight)! }),
                ...(unit !== undefined && { unit: toNullableText(unit)! }),
                ...(shelfLife !== undefined && { shelfLife: toNullableText(shelfLife)! }),
                ...(country !== undefined && { country: toNullableText(country)! }),
                ...(thumbnail !== undefined && { thumbnail: toNullableText(thumbnail) }),
                ...(galleryImages !== undefined && { galleryImages: toStringArray(galleryImages) }),
                ...(isActive !== undefined && { isActive: Boolean(isActive) }),
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