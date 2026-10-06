import { requireUser } from "@/lib/auth/requireUser";
import { PrismaClient } from "@prisma/client";
import { AddressLabel } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const VALID_LABELS: AddressLabel[] = ["HOME", "WORK", "OTHER"];

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

        const body = await request.json();
        const {
            house,
            street,
            landmark,
            pincode,
            label,
        } = body;

        // Validation
        if (!house?.trim() || !street?.trim() || !pincode?.trim()) {
            return NextResponse.json(
                {
                    success: false,
                    message: "House, Street and Pincode are required.",
                },
                { status: 400 }
            );
        }

        if (!/^\d{6}$/.test(pincode.trim())) {
            return NextResponse.json(
                { success: false, message: "Pincode must be 6 digits." },
                { status: 400 }
            );
        }

        const finalLabel = VALID_LABELS.includes(label) ? label : "HOME";

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

        // Check duplicate address for this user (excluding the one being edited)
        const duplicateAddress = await prisma.address.findFirst({
            where: {
                userId,
                house: house.trim(),
                street: street.trim(),
                pincode: pincode.trim(),
                id: { not: addressId },
            },
        });

        if (duplicateAddress) {
            return NextResponse.json(
                {
                    success: false,
                    message: "This address already exists.",
                },
                { status: 409 }
            );
        }

        const address = await prisma.address.update({
            where: { id: addressId },
            data: {
                label: finalLabel,
                house: house.trim(),
                street: street.trim(),
                landmark: landmark?.trim() || null,
                pincode: pincode.trim(),
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Address updated successfully.",
                address,
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