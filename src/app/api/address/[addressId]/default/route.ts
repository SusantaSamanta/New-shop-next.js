import { requireUser } from "@/lib/auth/requireUser";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
    params: Promise<{ addressId: string }>;
};

export async function PUT(request: NextRequest, { params }: RouteContext) {
    try {
        const auth = await requireUser(request);

        if (!auth.success) {
            return NextResponse.json(
                { success: false, message: auth.message },
                { status: auth.status }
            );
        }

        const userId = auth.user.id;

        if (!userId) {
            return NextResponse.json(
                { success: false, message: "User id missing in session." },
                { status: 401 }
            );
        }

        const { addressId } = await params;

        if (!addressId?.trim()) {
            return NextResponse.json(
                { success: false, message: "Address id is required." },
                { status: 400 }
            );
        }

        const prisma = new PrismaClient();

        const existingAddress = await prisma.address.findFirst({
            where: { id: addressId, userId },
        });

        if (!existingAddress) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Address not found.",
                },
                { status: 404 }
            );
        }

        await prisma.users.update({
            where: { id: userId },
            data: { defaultAddressId: addressId },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Default address updated successfully.",
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