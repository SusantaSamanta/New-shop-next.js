"use client";

import { useState } from "react";
import {
    ArrowLeft,
    BriefcaseBusiness,
    Check,
    Circle,
    Home,
    MapPin,
    MoreHorizontal,
    X,
} from "lucide-react";

import { toast } from "sonner";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

type AddressFormProps = {
    selectedLocation: {
        id: string;
        name: string;
        address: string;

        city: string;
        state: string;
        country: string;
        pincode?: string;

        latitude: number;
        longitude: number;
    } | null;
    dealerId: string;
    onBack: () => void;
    onClose: () => void;
};

type AddressLabel = "HOME" | "WORK" | "OTHER";

export default function AddressForm({
    selectedLocation,
    dealerId,
    onBack,
    onClose,
}: AddressFormProps) {
    const [house, setHouse] = useState("");
    const [street, setStreet] = useState("");
    const [landmark, setLandmark] = useState("");
    const [pincode, setPincode] = useState("");
    const [label, setLabel] = useState<AddressLabel>("HOME");
    const [loading, setLoading] = useState(false);

    const handleSaveAddress = async () => {
        if (!selectedLocation) {
            toast.error("Please select a location");
            return;
        }

        if (!house.trim()) {
            toast.error("Please enter house / flat / building");
            return;
        }

        if (!street.trim()) {
            toast.error("Please enter street / area");
            return;
        }

        if (!pincode.trim()) {
            toast.error("Please enter pincode");
            return;
        }

        if (!/^\d{6}$/.test(pincode)) {
            toast.error("Please enter a valid 6-digit pincode");
            return;
        }

        try {
            setLoading(true);

            // Your address API will be called here
            // Example:
            //
            // await axios.post("/api/address", {
            //   house,
            //   street,
            //   landmark,
            //   city: selectedLocation.city,
            //   state: selectedLocation.state,
            //   country: selectedLocation.country,
            //   pincode,
            //   latitude: selectedLocation.latitude,
            //   longitude: selectedLocation.longitude,
            //   label,
            //   dealerId,
            // });

            console.log({
                house,
                street,
                landmark,
                city: selectedLocation.city,
                state: selectedLocation.state,
                country: selectedLocation.country,
                pincode,
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
                label,
                dealerId,
            });

            toast.success("Address saved successfully");

            onClose();
        } catch (error) {
            console.error("Save address error:", error);
            toast.error("Failed to save address");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative">
            {/* Header */}
               


            {/* Delivery available */}
            <div className="mt- px-4 py-2 flex items-center gap-4 rounded-2xl bg-emerald-50 dark:bg-emerald-700/10">
                <div className="hidden md:flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-600/20">
                    <MapPin
                        size={25}
                        strokeWidth={1}
                        className="fill-emerald-600 [&_circle]:fill-white text-emerald-600"
                    />
                </div>

                <div className="min-w-0">
                    <div className="flex items-center gap-2">
                        <Check
                            size={18}
                            className="rounded-full bg-emerald-600 p-0.5 text-white"
                        />

                        <p className="font-semibold text-emerald-600">
                            Delivery available
                        </p>
                    </div>

                    <p className="mt-1 truncate text-sm text-gray-700">
                        {selectedLocation?.name}{selectedLocation?.address}
                    </p>
                </div>
            </div>

            {/* Form */}
            <div className="mt-4 space-y-3.5">
                {/* House */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">
                        House / Flat / Building <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="text"
                        value={house}
                        onChange={(e) => setHouse(e.target.value)}
                        placeholder="Enter house number, flat number or building name"
                        className="h-10 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                    />
                </div>

                {/* Street */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">
                        Street / Area <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="Enter street name or area"
                        className="h-10 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                    />
                </div>

                {/* Landmark */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">
                        Landmark <span className="font-normal text-gray-500">(optional)</span>
                    </label>

                    <input
                        type="text"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        placeholder="Nearby landmark (e.g. metro station, school, temple...)"
                        className="h-10 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                    />
                </div>

                {/* Pincode */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">
                        Pincode <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={pincode}
                        onChange={(e) =>
                            setPincode(e.target.value.replace(/\D/g, ""))
                        }
                        placeholder="Enter pincode"
                        className="h-10 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                    />
                </div>

                {/* Save address as */}
                <div>
                    <p className="mb-3 text-sm font-semibold">
                        Save address as
                    </p>

                    <div className="grid grid-cols-3 gap-3">
                        {/* Home */}
                        <button
                            type="button"
                            onClick={() => setLabel("HOME")}
                            className={`flex h-12 items-center justify-center gap-2 rounded-xl border text-sm font-medium transition ${label === "HOME"
                                ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-600/20 text-emerald-600"
                                : "border-gray-300 text-gray-700 hover:border-gray-400"
                                }`}
                        >
                            {label === "HOME" ? (
                                <Check
                                    size={20}
                                    className="rounded-full bg-emerald-600 p-0.5 text-white"
                                />
                            ) : (
                                <Circle size={20} className="text-gray-400" />
                            )}

                            <Home size={20} className="hidden md:block" />
                            <span>Home</span>
                        </button>

                        {/* Work */}
                        <button
                            type="button"
                            onClick={() => setLabel("WORK")}
                            className={`flex h-12 items-center justify-center gap-2 rounded-xl border text-sm font-medium transition ${label === "WORK"
                                ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-600/20 text-emerald-600"
                                : "border-gray-300 text-gray-700 hover:border-gray-400"
                                }`}
                        >
                            {label === "WORK" ? (
                                <Check
                                    size={20}
                                    className="rounded-full bg-emerald-600 p-0.5 text-white"
                                />
                            ) : (
                                <Circle size={20} className="text-gray-400" />
                            )}

                            <BriefcaseBusiness size={20} className="hidden md:block"/>
                            <span>Work</span>
                        </button>

                        {/* Other */}
                        <button
                            type="button"
                            onClick={() => setLabel("OTHER")}
                            className={`flex h-12 items-center justify-center gap-2 rounded-xl border text-sm font-medium transition ${label === "OTHER"
                                ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-600/20 text-emerald-600"
                                : "border-gray-300 text-gray-700 hover:border-gray-400"
                                }`}
                        >
                            {label === "OTHER" ? (
                                <Check
                                    size={20}
                                    className="rounded-full bg-emerald-600 p-0.5 text-white"
                                />
                            ) : (
                                <Circle size={20} className="text-gray-400" />
                            )}

                            <MoreHorizontal size={20} className="hidden md:block"/>
                            <span >Other</span>
                        </button>
                    </div>
                </div>

                {/* Save */}
                <button
                    type="button"
                    disabled={loading}
                    onClick={handleSaveAddress}
                    className="py-2 mb-4 sm:my-1.5 w-full rounded-lg bg-green-600 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Saving..." : "Save Address"}
                </button>
            </div>
        </div>
    );
}