"use client";

import {
    BriefcaseBusiness,
    Check,
    Circle,
    Home,
    MapPin,
    MoreHorizontal,
} from "lucide-react";

import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";
import axios from "axios";
import { useEffect } from "react";
import { EditAddressType } from "@/type/addressTypes";

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
    editAddress: EditAddressType | null;
    dealerId: string;
    onClose: () => void;
};

const addressSchema = z.object({
    house: z.string().trim().min(1, "Enter house / flat / building"),
    street: z.string().trim().min(1, "Enter street / area"),
    landmark: z.string(),
    pincode: z
        .string()
        .trim()
        .regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
    label: z.enum(["HOME", "WORK", "OTHER"]),
});

type FormSchema = z.infer<typeof addressSchema>;

export default function AddressForm({
    selectedLocation,
    editAddress,
    dealerId,
    onClose,
}: AddressFormProps) {
    const isEditing = Boolean(editAddress);

    const form = useForm<FormSchema>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            house: "",
            street: "",
            landmark: "",
            pincode: "",
            label: "HOME",
        },
    });

    useEffect(() => {
        form.reset({
            house: editAddress?.house ?? "",
            street: editAddress?.street ?? "",
            landmark: editAddress?.landmark ?? "",
            pincode: editAddress?.pincode ?? "",
            label: editAddress?.label ?? "HOME",
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editAddress]);

    const onSubmit = async (data: FormSchema) => {
        const addressToEdit = editAddress;

        if (addressToEdit) {
            try {
                const response = await axios.put(
                    `/api/address/${addressToEdit.addressId}`,
                    {
                        house: data.house,
                        street: data.street,
                        landmark: data.landmark,
                        pincode: data.pincode,
                        label: data.label,
                    }
                );

                console.log("Update address response:", response.data);

                toast.success(
                    response.data?.message || "Address updated successfully"
                );

                onClose();
            } catch (error) {
                console.error("Update address error:", error);

                const err = error as {
                    response?: { data?: { message?: string } };
                };

                toast.error(
                    err.response?.data?.message || "Failed to update address"
                );
            }

            return;
        }

        if (!selectedLocation) {
            toast.error("Please select a location");
            return;
        }

        try {
            const response = await axios.post("/api/address", {
                house: data.house,
                street: data.street,
                landmark: data.landmark,
                city: selectedLocation.city,
                state: selectedLocation.state,
                country: selectedLocation.country,
                pincode: data.pincode,
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
                label: data.label,
                apiAddress: selectedLocation.address,
                dealerId,
            });

            console.log("Save address response:", response.data);

            toast.success(
                response.data?.message || "Address saved successfully"
            );

            onClose();
        } catch (error) {
            console.error("Save address error:", error);

            const err = error as {
                response?: { data?: { message?: string } };
            };

            toast.error(
                err.response?.data?.message || "Failed to save address"
            );
        }
    };

    return (
        <div className="relative">
            {/* Delivery available */}
            <div className="mb-4 px-4 py-2 flex items-center gap-4 rounded-2xl bg-emerald-50 dark:bg-emerald-700/10">
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
                            {isEditing ? "Editing address" : "Delivery available"}
                        </p>
                    </div>

                    <p className="mt-1 truncate text-sm text-gray-700">
                        {isEditing
                            ? editAddress?.apiAddress ||
                              [editAddress?.house, editAddress?.street]
                                  .filter(Boolean)
                                  .join(", ")
                            : `${selectedLocation?.name} ${selectedLocation?.address}`.trim()}
                    </p>
                </div>
            </div>

            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="relative space-y-3.5"
            >
                <FieldSet>
                    <FieldGroup className="gap-3.5">

                        {/* House */}
                        <Controller
                            name="house"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field
                                    data-invalid={fieldState.invalid}
                                >
                                    <FieldLabel htmlFor="house">
                                        House / Flat / Building{" "}
                                        <span className="text-red-500">
                                            *
                                        </span>
                                    </FieldLabel>

                                    <Input
                                        {...field}
                                        id="house"
                                        type="text"
                                        placeholder="Enter house number, flat number or building name"
                                        aria-invalid={fieldState.invalid}
                                        className="h-10 px-4"
                                        disabled={
                                            form.formState.isSubmitting
                                        }
                                    />

                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />

                        {/* Street */}
                        <Controller
                            name="street"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field
                                    data-invalid={fieldState.invalid}
                                >
                                    <FieldLabel htmlFor="street">
                                        Street / Area{" "}
                                        <span className="text-red-500">
                                            *
                                        </span>
                                    </FieldLabel>

                                    <Input
                                        {...field}
                                        id="street"
                                        type="text"
                                        placeholder="Enter street name or area"
                                        aria-invalid={fieldState.invalid}
                                        className="h-10 px-4"
                                        disabled={
                                            form.formState.isSubmitting
                                        }
                                    />

                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />

                        {/* Landmark */}
                        <Controller
                            name="landmark"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field
                                    data-invalid={fieldState.invalid}
                                >
                                    <FieldLabel htmlFor="landmark">
                                        Landmark{" "}
                                        <span className="font-normal text-gray-500">
                                            (optional)
                                        </span>
                                    </FieldLabel>

                                    <Input
                                        {...field}
                                        id="landmark"
                                        type="text"
                                        placeholder="Nearby landmark (e.g. metro station, school, temple...)"
                                        aria-invalid={fieldState.invalid}
                                        className="h-10 px-4"
                                        disabled={
                                            form.formState.isSubmitting
                                        }
                                    />

                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />

                        {/* Pincode */}
                        <Controller
                            name="pincode"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field
                                    data-invalid={fieldState.invalid}
                                >
                                    <FieldLabel htmlFor="pincode">
                                        Pincode{" "}
                                        <span className="text-red-500">
                                            *
                                        </span>
                                    </FieldLabel>

                                    <Input
                                        {...field}
                                        id="pincode"
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={6}
                                        placeholder="Enter pincode"
                                        aria-invalid={fieldState.invalid}
                                        className="h-10 px-4"
                                        disabled={
                                            form.formState.isSubmitting
                                        }
                                        onChange={(e) =>
                                            field.onChange(
                                                e.target.value.replace(
                                                    /\D/g,
                                                    ""
                                                )
                                            )
                                        }
                                    />

                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />

                        {/* Save address as */}
                        <Controller
                            name="label"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field
                                    data-invalid={fieldState.invalid}
                                >
                                    <FieldLabel>
                                        Save address as
                                    </FieldLabel>

                                    <div className="grid grid-cols-3 gap-3">
                                        {(
                                            [
                                                {
                                                    value: "HOME",
                                                    icon: Home,
                                                    text: "Home",
                                                },
                                                {
                                                    value: "WORK",
                                                    icon: BriefcaseBusiness,
                                                    text: "Work",
                                                },
                                                {
                                                    value: "OTHER",
                                                    icon: MoreHorizontal,
                                                    text: "Other",
                                                },
                                            ] as const
                                        ).map(({ value, icon: Icon, text }) => (
                                            <button
                                                key={value}
                                                type="button"
                                                onClick={() =>
                                                    field.onChange(value)
                                                }
                                                aria-pressed={
                                                    field.value === value
                                                }
                                                className={`flex h-12 items-center justify-center gap-2 rounded-xl border text-sm font-medium transition ${field.value === value
                                                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-600/20 text-emerald-600"
                                                    : "border-gray-300 text-gray-700 hover:border-gray-400"
                                                    }`}
                                            >
                                                {field.value === value ? (
                                                    <Check
                                                        size={20}
                                                        className="rounded-full bg-emerald-600 p-0.5 text-white"
                                                    />
                                                ) : (
                                                    <Circle
                                                        size={20}
                                                        className="text-gray-400"
                                                    />
                                                )}

                                                <Icon
                                                    size={20}
                                                    className="hidden md:block"
                                                />

                                                <span>{text}</span>
                                            </button>
                                        ))}
                                    </div>

                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </FieldSet>

                {/* Save */}
                <button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="py-2 mb-4 sm:my-1.5 w-full rounded-lg bg-green-600 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {form.formState.isSubmitting
                        ? isEditing
                            ? "Updating..."
                            : "Saving..."
                        : isEditing
                            ? "Update Address"
                            : "Save Address"}
                </button>
            </form>
        </div>
    );
}