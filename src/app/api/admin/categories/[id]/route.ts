//  PATCH   /api/admin/categories/:id
//  DELETE   /api/admin/categories/:id
/// GET    /api/admin/categories/:id



import { requireAdmin } from "@/lib/auth/requireAdmin";
import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

async function wait() {
    return new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });
}
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await wait()

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
                    message: "Category id require."
                },
                { status: 404 },
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


// patch: /api/admin/categories/:id
// Update fields matching by id
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const admin = await requireAdmin(request);
    // if (!admin.success) {
    //     return NextResponse.json(
    //         { success: false, message: admin.message },
    //         { status: admin.status }
    //     );
    // }

    try {
        const { id } = await params;
        if (!id) return NextResponse.json({ success: false, message: "Id required" }, { status: 400 });

        const prisma = new PrismaClient();

        const category = await prisma.categories.findUnique({
            where: {
                id
            }
        });

        if (!category) return NextResponse.json({ success: false, message: "Category not found" }, { status: 404 });

        let body;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json({ success: false, message: "Invalid JSON body" }, { status: 400 });
        }

        const {
            name,
            slug,
            description,
            image,
            isActive,
            sortOrder,
        } = body;

        if (name === undefined && slug === undefined && description === undefined && image === undefined && isActive === undefined && sortOrder === undefined) {
            return NextResponse.json(
                { success: false, message: "Nothing to update. Send at least one field." },
                { status: 400 }
            );
        }

        /// Check that name already exist or not ? 
        if (name !== undefined && name !== category.name) {
            const existingName = await prisma.categories.findFirst({
                where: { name, NOT: { id } },
            });
            if (existingName) {
                return NextResponse.json(
                    { success: false, message: "Category name already exists." },
                    { status: 409 }
                );
            }
        }

        /// Check that slug name already exist or not ? 
        if (slug !== undefined && slug !== category.slug) {
            const existingSlug = await prisma.categories.findFirst({
                where: { slug, NOT: { id } },
            });
            if (existingSlug) {
                return NextResponse.json(
                    { success: false, message: "Category slug already exists." },
                    { status: 409 }
                );
            }
        }

        const updatedCategory = await prisma.categories.update({
            where: { id },
            data: {
                ...(name !== undefined && { name }),
                ...(slug !== undefined && { slug }),
                ...(description !== undefined && { description }),
                ...(image !== undefined && { image }),
                ...(isActive !== undefined && { isActive }),
                ...(sortOrder !== undefined && { sortOrder }),
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Category updated successfully.",
                category: updatedCategory
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


// delete: /api/admin/categories/:id

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

        const category = await prisma.categories.findUnique({
            where: {
                id
            }
        });

        if (!category) return NextResponse.json({ success: false, message: "Category not found" }, { status: 404 });

        await prisma.categories.delete({
            where: { id }
        });

        return NextResponse.json(
            {
                success: true,
                message: "Category deleted successfully."
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



