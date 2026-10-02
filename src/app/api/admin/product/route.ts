/// POST   /api/admin/product
/// GET    /api/admin/product

import { requireAdmin } from "@/lib/auth/requireAdmin";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

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

/// POST   /api/admin/product
export async function POST(request: NextRequest) {
    try {
        const admin = await requireAdmin(request);
        if (!admin.success) {
            return NextResponse.json(
                { success: false, message: admin.message },
                { status: admin.status }
            );
        }

        let body: Record<string, unknown>;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json(
                { success: false, message: "Invalid JSON body" },
                { status: 400 }
            );
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

        // Validation
        const nameText = toNullableText(name);
        const slugText = toNullableText(slug);

        if (!nameText || !slugText) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Name and Slug are required.",
                },
                { status: 400 }
            );
        }

        const categoryList = toStringArray(categories);
        if (categoryList.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Select at least one category.",
                },
                { status: 400 }
            );
        }

        const weightText = toNullableText(weight);
        const unitText = toNullableText(unit);
        const shelfLifeText = toNullableText(shelfLife);
        const countryText = toNullableText(country);

        const missing = [
            !weightText && "Weight",
            !unitText && "Unit",
            !shelfLifeText && "Shelf Life",
            !countryText && "Country",
        ].filter(Boolean);

        if (missing.length > 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: `${missing.join(", ")} required.`,
                },
                { status: 400 }
            );
        }

        const prisma = new PrismaClient();

        // Check duplicate name
        const existingName = await prisma.products.findUnique({
            where: {
                name: nameText,
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
                slug: slugText,
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
                name: nameText,
                slug: slugText,
                shortDescription: toNullableText(shortDescription),
                description: toNullableText(description),
                categories: categoryList,
                subcategories: toStringArray(subcategories),
                mrp: toNumber(mrp),
                sellingPrice: toNumber(sellingPrice),
                tax: toNumber(tax),
                weight: weightText!,
                unit: unitText!,
                shelfLife: shelfLifeText!,
                country: countryText!,
                thumbnail: toNullableText(thumbnail),
                galleryImages: toStringArray(galleryImages),
                isActive: typeof isActive === "boolean" ? isActive : true,
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
}

/// GET   /api/admin/product
export async function GET(request: NextRequest) {
    try {
        const admin = await requireAdmin(request);
        if (!admin.success) {
            return NextResponse.json(
                { message: admin.message },
                { status: admin.status }
            );
        }

        const searchParams = request.nextUrl.searchParams;

        const page = Math.max(parseInt(searchParams.get("page") || "1") || 1, 1);
        const limit = Math.min(Math.max(parseInt(searchParams.get("limit") || "10") || 10, 1), 100);
        const status = searchParams.get("status"); // "active" | "inactive"

        const where = {
            ...(status === "active" && { isActive: true }),
            ...(status === "inactive" && { isActive: false }),
        };

        const prisma = new PrismaClient()

        const [products, total] = await Promise.all([
            prisma.products.findMany({
                where,
                orderBy: {
                    createdAt: "desc",
                },
                skip: (page - 1) * limit,
                take: limit,
            }),
            prisma.products.count({ where }),
        ]);

        return NextResponse.json(
            {
                success: true,
                message: "Products fetched successfully.",
                products,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                    hasNextPage: page < Math.ceil(total / limit),
                    hasPrevPage: page > 1,
                },
            },
            { status: 200 }
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