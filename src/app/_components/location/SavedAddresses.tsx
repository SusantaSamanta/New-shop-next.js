"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { BriefcaseBusiness, Home, Loader2, MapPin, PenLine, Star } from "lucide-react";

export type SavedAddress = {
    id: string;
    label: "HOME" | "WORK" | "OTHER";
    house: string;
    street: string;
    landmark: string | null;
    city: string;
    state: string;
    country: string;
    pincode: string;
    latitude: number;
    longitude: number;
    apiAddress: string;
    user: {
        dealerId: string | null;
        defaultAddressId: string | null;
        isServiceAvailable: boolean;
    } | null;
    createdAt: string;
};

const LABEL_ICONS = {
    HOME: Home,
    WORK: BriefcaseBusiness,
    OTHER: MapPin,
} as const;

const LABEL_TITLES = {
    HOME: "Home",
    WORK: "Work",
    OTHER: "Other",
} as const;

type SavedAddressesProps = {
    onEdit: (address: SavedAddress) => void;
};

export default function SavedAddresses({ onEdit }: SavedAddressesProps) {
    const [addresses, setAddresses] = useState<SavedAddress[]>([]);
    const [defaultAddressId, setDefaultAddressId] = useState<string | null>(null);
    const [defaultingId, setDefaultingId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isCancelled = false;

        const fetchSavedAddresses = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await axios.get("/api/address");

                if (!isCancelled) {
                    setAddresses(response.data?.addresses ?? []);
                    setDefaultAddressId(response.data?.defaultAddressId ?? null);
                }
            } catch (err) {
                console.error("Saved addresses fetch error:", err);

                const errorInfo = err as {
                    response?: { status?: number; data?: { message?: string } };
                };

                if (isCancelled) return;

                setAddresses([]);
                setError(
                    errorInfo.response?.status === 401
                        ? "Please sign in to see your saved addresses."
                        : (errorInfo.response?.data?.message ??
                            "Failed to load saved addresses.")
                );
            } finally {
                if (!isCancelled) setLoading(false);
            }
        };

        fetchSavedAddresses();

        return () => {
            isCancelled = true;
        };
    }, []);

    const handleSetDefault = async (address: SavedAddress) => {
        if (defaultingId) return;

        setDefaultingId(address.id);

        try {
            const response = await axios.put(
                `/api/address/${address.id}/default`
            );

            console.log("Set default address response:", response.data);

            setDefaultAddressId(address.id);

            toast.success(
                response.data?.message ||
                    "Default address updated successfully"
            );
        } catch (err) {
            console.error("Set default address error:", err);

            const errorInfo = err as {
                response?: { data?: { message?: string } };
            };

            toast.error(
                errorInfo.response?.data?.message ||
                    "Failed to update default address"
            );
        } finally {
            setDefaultingId(null);
        }
    };

    if (loading) {
        return (
            <div className="rounded-lg border border-dashed p-8 text-center">
                <Loader2
                    size={24}
                    className="mx-auto mb-3 animate-spin text-muted-foreground"
                />
                <p className="text-sm font-medium">
                    Loading saved addresses...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-lg border border-dashed p-8 text-center">
                <MapPin
                    size={28}
                    className="mx-auto mb-3 text-muted-foreground"
                />
                <p className="text-sm font-medium">{error}</p>
            </div>
        );
    }

    if (addresses.length === 0) {
        return (
            <div className="rounded-lg border border-dashed p-8 text-center">
                <MapPin
                    size={28}
                    className="mx-auto mb-3 text-muted-foreground"
                />

                <p className="text-sm font-medium">No saved addresses</p>

                <p className="mt-1 text-xs text-muted-foreground">
                    Your saved delivery addresses will appear here.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {addresses.map((address) => {
                const LabelIcon = LABEL_ICONS[address.label] ?? MapPin;

                const isDefault = address.id === defaultAddressId;
                const isSettingDefault = address.id === defaultingId;

                return (
                    <div
                        key={address.id}
                        className="flex w-full items-start gap-3 rounded-lg border px-3 py-3 text-left transition hover:bg-muted/60 relative"
                    >
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gray-100">
                            <LabelIcon
                                size={18}
                                strokeWidth={3}
                                className="text-muted-foreground"
                            />
                        </span>

                        <div className="min-w-0 flex-1">

                            <div className="flex items-center gap-2">
                                <p className="truncate text-sm font-semibold capitalize">
                                    {LABEL_TITLES[address.label] ??
                                        address.label.toLowerCase()}
                                </p>
                                {isDefault &&
                                    <p className="ml- p-1 px-2 text-xs flex items-center gap-1 text-emerald-600 bg-green-100 dark:bg-green-500/10 rounded-2xl">
                                        Default
                                        <Star size={10} className="fill-emerald-600 text-emerald-600" />
                                    </p>
                                }
                            </div>


                            <p className="mt-0.5 whitespace-break-spaces text-xs leading-relaxed text-muted-foreground">
                                {address.house}
                                {address.street && ", " + address.street}
                                {address.state && ", " + address.state}
                                {address.pincode && ", " + address.pincode}
                                {address.landmark && ",\nNear " + address.landmark}
                            </p>

                            {address.apiAddress ? (
                                <p className="mt-0.5 whitespace-break-spaces text-xs leading-relaxed text-muted-foreground">
                                    {address.apiAddress}
                                </p>
                            ) : (
                                <p className="mt-0.5 text-xs text-muted-foreground">
                                    Address
                                </p>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => handleSetDefault(address)}
                                disabled={isDefault || isSettingDefault}
                                title={isDefault ? "Default address" : "Set as default"}
                                className={`p-2 rounded-full transition ${isDefault
                                    ? "bg-green-100 dark:bg-green-500/10 cursor-default"
                                    : "bg-gray-100 hover:bg-gray-200 disabled:opacity-60"
                                    }`}
                            >
                                {isSettingDefault ? (
                                    <Loader2 size={14} className="animate-spin" />
                                ) : (
                                    <Star
                                        size={14}
                                        className={
                                            isDefault
                                                ? "fill-emerald-600 text-emerald-600"
                                                : ""
                                        }
                                    />
                                )}
                            </button>
                            <button onClick={() => onEdit(address)} className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full">
                                <PenLine size={14} />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}