"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { useState } from "react";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { toast } from "sonner";
import axios from "axios";

export default function CategoryForm() {


    const [nameErrorMess, setNameErrorMess] = useState('');
    const [slugErrorMess, setSlugErrorMess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categorySchema = z.object({
        name: z.string().min(3, "Minimum 3 characters required"),
        slug: z.string().min(3, "Minimum 3 characters required"),
        description: z.union([
            z.literal(""),
            z.string().min(10, "Description must be at least 10 characters"),
        ]),
        image: z
            .url("Image URL is required")
            .or(z.literal(""))
            .optional(),
        isActive: z.boolean().default(true),
    });

    type FormSchema = z.infer<typeof categorySchema>;

    const form = useForm<FormSchema>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: "",
            slug: "",
            description: "",
            image: "",
            isActive: true,
        },
    });

    const onSubmit = async (data: FormSchema) => {
        try {
            setIsSubmitting(true);
            setNameErrorMess("");

            const response = await axios.post(
                "/api/admin/categories",
                data
            );

            toast.success(response.data.message);

            form.reset();

        } catch (error: any) {
            const message =
                error.response?.data?.message ||
                "Something went wrong.";

            if (message === 'Category name already exists.')
                setNameErrorMess(message);
            else if (message === 'Category slug already exists.')
                setSlugErrorMess(message);
            else
                toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <form onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4">
            <FieldSet>
                <FieldGroup>

                    {/* Basic Information */}
                    <div className="rounded-2xl border bg-background p-3 md:p-4 space-y-4">
                        <h2 className="text-lg font-semibold">
                            Basic Information
                        </h2>

                        <div className="grid gap-5 md:grid-cols-2">

                            <div className="space-y-2">
                                <Controller name='name' control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor='name'>Category Name</FieldLabel>
                                            <Input {...field} id='name'
                                                placeholder='Vegetables'
                                                aria-invalid={fieldState.invalid}
                                                onChange={(e) => {
                                                    setNameErrorMess('')
                                                    field.onChange(e);
                                                }}
                                            />
                                            {nameErrorMess ?
                                                <p className={`text-[14px] tracking-tight text-red-600`}>
                                                    {nameErrorMess}
                                                </p>
                                                :
                                                fieldState.invalid && <FieldError errors={[fieldState.error]} />
                                            }
                                        </Field>
                                    )}
                                />
                            </div>

                            <div className="space-y-2">
                                <Controller name='slug' control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor='slug'>Slug</FieldLabel>
                                            <Input {...field} id='slug'
                                                placeholder='vegetables'
                                                aria-invalid={fieldState.invalid}
                                            // onChange={(e) => {
                                            //     setNameErrorMess('')
                                            //     field.onChange(e);
                                            // }}
                                            />
                                            {slugErrorMess ?
                                                <p className={`text-[14px] tracking-tight text-red-600`}>
                                                    {slugErrorMess}
                                                </p>
                                                :
                                                fieldState.invalid && <FieldError errors={[fieldState.error]} />
                                            }
                                        </Field>
                                    )}
                                />
                            </div>

                        </div>

                        <div className="space-y-2">



                            <Controller name='description' control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor='description'>Category Description</FieldLabel>
                                        <Textarea {...field} id='description'
                                            placeholder='Write category description...'
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {
                                            fieldState.invalid && <FieldError errors={[fieldState.error]} />
                                        }
                                    </Field>
                                )}
                            />


                        </div>

                    </div>





                    {/* Category Image */}
                    <div className="rounded-2xl border bg-background  p-3 md:p-4 space-y-4">
                        <h2 className="text-lg font-semibold">
                            Category Image
                        </h2>
                        <Controller name='image' control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor='image'>Image Link</FieldLabel>
                                    <Input {...field} id='image'
                                        placeholder='https://localhost/adimn/image'
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {
                                        fieldState.invalid && <FieldError errors={[fieldState.error]} />
                                    }
                                </Field>
                            )}
                        />


                    </div>

                    {/* Status */}
                    <Controller
                        name="isActive"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <div className="flex rounded-2xl border p-3 md:p-4 items-center">
                                    <FieldLabel className="mr-6 md:mr-10 text-lg font-semibold">
                                        Status
                                    </FieldLabel>

                                    <Select
                                        value={field.value ? "active" : "inactive"}
                                        onValueChange={(value) =>
                                            field.onChange(value === "active")
                                        }
                                    >
                                        <SelectTrigger className="max-w-xs">
                                            <SelectValue />
                                        </SelectTrigger>

                                        <SelectContent position="popper" sideOffset={4}>
                                            <SelectItem value="active">
                                                Active
                                            </SelectItem>

                                            <SelectItem value="inactive">
                                                Inactive
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </Field>
                        )}
                    />


                </FieldGroup>
            </FieldSet>



            {/* Buttons */}
            <Field>
                <div className="flex justify-end gap-3">
                    <Button onClick={() => form.reset()}
                    type="button"
                        variant="outline" className="p-5">
                        Reset
                    </Button>

                    <Button type='submit'
                        disabled={isSubmitting || nameErrorMess.length > 0} className="p-5">
                        Save Category
                    </Button>

                </div>
            </Field>

        </form>
    );
}