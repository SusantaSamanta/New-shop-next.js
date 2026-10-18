"use server";
import { requireAuthenticatedUser } from "@/lib/auth/requireAuthenticatedUser";
import { UserDefaultAddressType } from "@/type/addressTypes";
import { PrismaClient } from "@prisma/client";


export async function getUserDefaultAddress() {
    const auth = await requireAuthenticatedUser();

    if (!auth.success) {
        return { success: false, message: auth.message };  // 401 Unauthorized
    }

    const userId = auth.user.id;  // trusted — from JWT cookie, not client

    try {

        const prisma = new PrismaClient();

        const user = await prisma.users.findUnique({
            where: { id: userId },
            select: {
                defaultAddressId: true,
                isServiceAvailable: true,
            },
        });

        if (!user?.defaultAddressId) {
            return {
                success: false,
                message: "No default address set.",
                address: null,
            }
        }

        const address = await prisma.address.findFirst({
            where: {
                id: user.defaultAddressId,
                userId, // ensure the default address belongs to this user
            },
        });

        if (!address) {
            return {
                success: false,
                message: "Default address not found.",
                address: null,
            }
        }

        const defaultAddress: UserDefaultAddressType = {
            addressId: address.id,
            apiAddress: address.apiAddress,
            latitude: address.latitude,
            longitude: address.longitude,
            isServiceAvailable: user.isServiceAvailable,
            pincode: address.pincode,
            house: address.house ?? "",
            street: address.street ?? "",
            landmark: address.landmark,
            label: address.label,
        };

        return {
            success: true,
            message: "Default address fetched successfully.",
            address: defaultAddress,
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Internal Server Error.",
        }
    }
}


export async function deleteUserAddress(addressId: string | undefined) {
    const auth = await requireAuthenticatedUser();

    if (!auth.success) {
        return { success: false, message: auth.message };  // 401 Unauthorized
    }

    const userId = auth.user.id;  // trusted — from JWT cookie, not client

    try {

        if (!addressId?.trim()) {
            return { success: false, message: "Address id is required." }
        }

        const prisma = new PrismaClient();

        const existingAddress = await prisma.address.findFirst({
            where: { id: addressId, userId },
        });

        if (!existingAddress) {
            return {
                success: false,
                message: "Address not found.",
            }
        }

        // A default address must not be deleted
        const user = await prisma.users.findUnique({
            where: { id: userId },
            select: { defaultAddressId: true },
        });

        if (user?.defaultAddressId === addressId) {
            return {
                success: false,
                message:
                    "This is your default address. Set another address as default before deleting it.",
            }
        }

        await prisma.address.delete({
            where: { id: addressId },
        });

        return {
            success: true,
            message: "Address deleted successfully.",
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Internal Server Error.",
        }
    }
}
