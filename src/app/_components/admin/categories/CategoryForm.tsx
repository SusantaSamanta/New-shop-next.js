"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { useEffect, useState } from "react";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { toast } from "sonner";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function CategoryForm() {

    const { id } = useParams<{ id?: string }>();
    const router = useRouter();
    const [nameErrorMess, setNameErrorMess] = useState('');
    const [slugErrorMess, setSlugErrorMess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingPreviousInfo, setIsLoadingPreviousInfo] = useState(Boolean(id));
    const [isInvalidCategory, setIsInvalidCategory] = useState(false);




    const categorySchema = z.object({
        name: z.string().min(3, "Minimum 3 characters required"),
        slug: z.string().min(3, "Minimum 3 characters required"),
        description: z.union([
            z.literal(""),
            z.string().min(10, "Description must be at least 10 characters"),
        ]),
        image: z.string(),
            // .url("Image URL is required")
            // .or(z.literal(""))
            // .optional(),
        isActive: z.boolean(),
        sortOrder: z.number().int().min(0, "Sort order must be 0 or greater"),
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
            sortOrder: 0,
        },
    });

    ///// If the form is in edit mode, fetch previous data ////
    useEffect(() => {
        if (!id) return;

        const fetchCategory = async () => {
            try {
                const response = await axios.get(`/api/admin/categories/${id}`);
                const category = response.data?.category;
                if (category) {
                    form.reset({
                        name: category.name ?? "",
                        slug: category.slug ?? "",
                        description: category.description ?? "",
                        image: category.image ?? "",
                        isActive: category.isActive ?? true,
                        sortOrder: category.sortOrder ?? 0,
                    });
                }
            } catch (error) {
                const err = error as { response?: { status?: number; data?: { message?: string } } };
                const message =
                    err.response?.data?.message ||
                    "Something went wrong.";
                if (err.response?.status === 404) {
                    setIsInvalidCategory(true);
                } else {
                    toast.error(message);
                }
            } finally {
                setIsLoadingPreviousInfo(false);
            }
        };

        fetchCategory();
    }, [id, form]);

    ///////////// Create new category or edit ////////////////
    const onSubmit = async (data: FormSchema) => {
        try {
            setIsSubmitting(true);
            setNameErrorMess("");
            setSlugErrorMess("");
            const response = id
                ? await axios.patch(
                    `/api/admin/categories/${id}`,
                    data
                )
                : await axios.post(
                    "/api/admin/categories",
                    data
                );
            toast.success(response.data.message);
            if (id) {
                router.push("/admin/categories");
            } else {
                form.reset();
            }
        } catch (error) {
            const err = error as { response?: { data?: { message?: string } } };
            const message =
                err.response?.data?.message ||
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



    if (isInvalidCategory) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed bg-background p-10 text-center">
                <p className="text-lg font-semibold text-foreground">
                    Invalid Category ID
                </p>
                <p className="text-sm text-muted-foreground">
                    No category found with the given id. Please check the URL.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 relative">

            {isLoadingPreviousInfo && (
                <div className="h-full absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-background/80 backdrop-blur-[3px]">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Loading category...
                    </div>
                </div>
            )}

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
                                                disabled={isLoadingPreviousInfo}
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
                                                disabled={isLoadingPreviousInfo}
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
                                            disabled={isLoadingPreviousInfo}
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
                                        disabled={isLoadingPreviousInfo}
                                    />
                                    {
                                        fieldState.invalid && <FieldError errors={[fieldState.error]} />
                                    }
                                </Field>
                            )}
                        />


                    </div>

                    <div className="grid lg:grid-cols-[300px_220px] gap-4 ">
                        {/* Sort Order */}
                        <div className="rounded-2xl border bg-background p-3 md:p-4 space-y-3">
                            <Controller name='sortOrder' control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <div className="flex flex-wrap items-center gap-4">
                                            <FieldLabel htmlFor='sortOrder' className="text-lg font-semibold">
                                                Sort Order
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id='sortOrder'
                                                type="number"
                                                min={0}
                                                placeholder='0'
                                                aria-invalid={fieldState.invalid}
                                                disabled={isLoadingPreviousInfo}
                                                className="max-w-40 h-8"
                                                onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                                            />
                                        </div>
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
                                            disabled={isLoadingPreviousInfo}
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

                    </div>
                </FieldGroup>
            </FieldSet>



            {/* Buttons */}
            <Field>
                <div className="flex justify-end gap-3">
                    <Button onClick={() => form.reset()}
                        type="button"
                        variant="outline" className="p-5 cursor-pointer"
                        disabled={isLoadingPreviousInfo}>
                        Reset
                    </Button>

                    <Button type='submit'
                        disabled={isLoadingPreviousInfo || isSubmitting || nameErrorMess.length > 0} className="p-5 cursor-pointer disabled:cursor-not-allowed">
                        Save Category
                    </Button>

                </div>
            </Field>

        </form>
    );
}