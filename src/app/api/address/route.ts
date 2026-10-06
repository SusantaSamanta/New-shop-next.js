/// POST   /api/address
/// GET    /api/address

import { requireUser } from "@/lib/auth/requireUser";
import { PrismaClient } from "@prisma/client";
import { AddressLabel } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const VALID_LABELS: AddressLabel[] = ["HOME", "WORK", "OTHER"];


// Re-check serviceability on the server
const dealer = {
    id: "dealer_dummy_001",
    latitude: 22.595857570530875,
    longitude: 88.40670347213745,
    serviceRadiusKm: 5,
};

export async function POST(request: NextRequest) {
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

        const body = await request.json();
        const {
            house,
            street,
            landmark,
            city,
            state,
            country,
            pincode,
            latitude,
            longitude,
            label,
            apiAddress,
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

        const earthRadiusKm = 6371;

        const dLatitude = ((dealer.latitude - latitude) * Math.PI) / 180;

        const dLongitude = ((dealer.longitude - longitude) * Math.PI) / 180;

        const a =
            Math.sin(dLatitude / 2) ** 2 +
            Math.cos((latitude * Math.PI) / 180) *
            Math.cos((dealer.latitude * Math.PI) / 180) *
            Math.sin(dLongitude / 2) ** 2;

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distanceKm = earthRadiusKm * c;

        if (distanceKm > dealer.serviceRadiusKm) {
            return NextResponse.json(
                {
                    success: false,
                    message: "FreshNext is not available at this location.",
                    distanceKm: Number(distanceKm.toFixed(2)),
                },
                { status: 400 }
            );
        }

        const finalLabel = VALID_LABELS.includes(label) ? label : "HOME";

        const prisma = new PrismaClient();

        // Check duplicate address for this user
        const existingAddress = await prisma.address.findFirst({
            where: {
                userId,
                house: house.trim(),
                street: street.trim(),
                pincode: pincode.trim(),
            },
        });

        if (existingAddress) {
            return NextResponse.json(
                {
                    success: false,
                    message: "This address already exists.",
                },
                { status: 409 }
            );
        }

        const { address } = await prisma.$transaction(async (tx) => {
            const address = await tx.address.create({
                data: {
                    userId,
                    label: finalLabel,
                    house: house.trim(),
                    street: street.trim(),
                    landmark: landmark?.trim() || null,
                    city: city?.trim() || "",
                    state: state?.trim() || "",
                    country: country?.trim() || "",
                    pincode: pincode.trim(),
                    latitude,
                    longitude,
                    apiAddress: apiAddress?.trim() || "",
                },
            });

            const user = await tx.users.update({
                where: {
                    id: userId,
                },
                data: {
                    defaultAddressId: address.id,
                    dealerId: dealer.id,
                    isServiceAvailable: true,
                },
            });

            return {
                address,
                user,
            };
        });

        return NextResponse.json(
            {
                success: true,
                message: "Address saved successfully.",
                address,
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

export async function GET(request: NextRequest) {
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

        const prisma = new PrismaClient();

        const [addresses, user] = await Promise.all([
            prisma.address.findMany({
                where: { userId },
                include: {
                    user: {
                        select: {
                            dealerId: true,
                            defaultAddressId: true,
                            isServiceAvailable: true,
                        },
                    },
                },
                orderBy: { createdAt: "desc" },
            }),
            prisma.users.findUnique({
                where: { id: userId },
                select: { defaultAddressId: true },
            }),
        ]);

        return NextResponse.json(
            {
                success: true,
                message: "Addresses fetched successfully.",
                addresses,
                defaultAddressId: user?.defaultAddressId ?? null,
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