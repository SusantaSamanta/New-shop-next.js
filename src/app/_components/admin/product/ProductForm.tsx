"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { subcategories } from "../../../../../assets/Collections categories";
import { Skeleton } from "@/components/ui/skeleton";

type Category = {
    id: string;
    name: string;
    slug: string;
};

export default function ProductForm() {

    const { id } = useParams<{ id?: string }>();
    const router = useRouter();

    const productSchema = z.object({
        name: z.string().min(3, "Minimum 3 characters required"),
        slug: z.string().min(3, "Minimum 3 characters required"),
        shortDescription: z.union([
            z.literal(""),
            z.string().min(10, "Short description must be at least 10 characters"),
        ]),
        description: z.union([
            z.literal(""),
            z.string().min(10, "Description must be at least 10 characters"),
        ]),
        categories: z.array(z.string()).min(1, "Select at least one category"),
        subcategories: z.array(z.string()),
        mrp: z.number().min(0, "MRP must be 0 or greater"),
        sellingPrice: z.number().min(0, "Selling price must be 0 or greater"),
        tax: z.number().min(0, "Tax must be 0 or greater"),
        weight: z.string().min(1, "Weight is required"),
        unit: z.string().min(1, "Select a unit"),
        shelfLife: z.string().min(1, "Shelf life is required"),
        country: z.string().min(2, "Country is required"),
        thumbnail: z.string(),
        galleryImages: z.string(),
        isActive: z.boolean(),
    });

    type FormSchema = z.infer<typeof productSchema>;

    const [nameErrorMess, setNameErrorMess] = useState('');
    const [slugErrorMess, setSlugErrorMess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingPreviousInfo, setIsLoadingPreviousInfo] = useState(Boolean(id));
    const [isInvalidProduct, setIsInvalidProduct] = useState(false);

    const form = useForm<FormSchema>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            slug: "",
            shortDescription: "",
            description: "",
            categories: [],
            subcategories: [],
            mrp: 0,
            sellingPrice: 0,
            tax: 0,
            weight: "",
            unit: "",
            shelfLife: "",
            country: "",
            thumbnail: "",
            galleryImages: "",
            isActive: true,
        },
    });

    // ----- Category fetching state -----
    const [allCategories, setAllCategories] = useState<Category[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);
    const [categoryError, setCategoryError] = useState<string | null>(null);

    // Fetch active categories once when the form mounts
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("/api/admin/categories/all-active");
                setAllCategories(response.data?.categories ?? []);
            } catch (error) {
                const err = error as { response?: { data?: { message?: string } } };
                setCategoryError(err.response?.data?.message || "Failed to fetch categories");
            } finally {
                setIsLoadingCategories(false);
            }
        })();
    }, []);

    // ----- Category selection state -----
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    // Toggle a category in/out of the selection.
    // Selection order is kept (last selected sits at the end of the array).
    const toggleCategory = (slug: string) => {
        setSelectedCategories((prev) => {
            const next = prev.includes(slug)
                ? prev.filter((item) => item !== slug)
                : [...prev, slug];
            form.setValue("categories", next, { shouldValidate: true });
            return next;
        });
    };

    // ----- Subcategory selection state -----
    const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);

    // Toggle a subcategory in/out of the selection (stored by name).
    const toggleSubcategory = (name: string) => {
        setSelectedSubcategories((prev) => {
            const next = prev.includes(name)
                ? prev.filter((item) => item !== name)
                : [...prev, name];
            form.setValue("subcategories", next, { shouldValidate: true });
            return next;
        });
    };

    // ----- Derived: subcategories for the selected categories -----
    // Only keeps subcategories that match a selected category slug,
    // with the most recently selected category's subcategories first.
    const orderedSubcategories = (() => {
        const ordered: string[] = [];
        const seen = new Set<string>();

        for (let i = selectedCategories.length - 1; i >= 0; i--) {
            const items = subcategories[selectedCategories[i]];
            if (items) {
                for (const item of items) {
                    if (!seen.has(item)) {
                        seen.add(item);
                        ordered.push(item);
                    }
                }
            }
        }
        return ordered;
})();

    ///// If the form is in edit mode, fetch previous data ////
    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/admin/product/${id}`);
                const product = response.data?.product;
                if (product) {
                    form.reset({
                        name: product.name ?? "",
                        slug: product.slug ?? "",
                        shortDescription: product.shortDescription ?? "",
                        description: product.description ?? "",
                        categories: product.categories ?? [],
                        subcategories: product.subcategories ?? [],
                        mrp: Number(product.mrp ?? 0),
                        sellingPrice: Number(product.sellingPrice ?? 0),
                        tax: Number(product.tax ?? 0),
                        weight: product.weight ?? "",
                        unit: product.unit ?? "",
                        shelfLife: product.shelfLife ?? "",
                        country: product.country ?? "",
                        thumbnail: product.thumbnail ?? "",
                        galleryImages: (product.galleryImages ?? []).join(", "),
                        isActive: product.isActive ?? true,
                    });
                    setSelectedCategories(product.categories ?? []);
                    setSelectedSubcategories(product.subcategories ?? []);
                }
            } catch (error) {
                const err = error as { response?: { status?: number; data?: { message?: string } } };
                const message =
                    err.response?.data?.message ||
                    "Something went wrong.";
                if (err.response?.status === 404) {
                    setIsInvalidProduct(true);
                } else {
                    toast.error(message);
                }
            } finally {
                setIsLoadingPreviousInfo(false);
            }
        };

        fetchProduct();
    }, [id, form]);

    ///////////// Create new product or edit ////////////////
    const onSubmit = async (data: FormSchema) => {
        try {
            setIsSubmitting(true);
            setNameErrorMess("");
            setSlugErrorMess("");

            // The field holds a comma separated string, the API expects an array
            const payload = {
                ...data,
                galleryImages: data.galleryImages
                    .split(',')
                    .map((url) => url.trim())
                    .filter(Boolean),
            };

            const response = id
                ? await axios.patch(
                    `/api/admin/product/${id}`,
                    payload
                )
                : await axios.post(
                    "/api/admin/product",
                    payload
                );
            toast.success(response.data.message);
            if (id) {
                router.push("/admin/products");
            } else {
                form.reset();
                setSelectedCategories([]);
                setSelectedSubcategories([]);
            }
        } catch (error) {
            const err = error as { response?: { data?: { message?: string } } };
            const message =
                err.response?.data?.message ||
                "Something went wrong.";
            if (message === 'Product name already exists.')
                setNameErrorMess(message);
            else if (message === 'Product slug already exists.')
                setSlugErrorMess(message);
            else
                toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };


    if (isInvalidProduct) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed bg-background p-10 text-center">
                <p className="text-lg font-semibold text-foreground">
                    Invalid Product ID
                </p>
                <p className="text-sm text-muted-foreground">
                    No product found with the given id. Please check the URL.
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
                        Loading product...
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
                                    <FieldLabel htmlFor='name'>Product Name</FieldLabel>
                                    <Input {...field} id='name'
                                        placeholder="Amul Gold Milk"
                                        aria-invalid={fieldState.invalid}
                                        onChange={(e) => {
                                            setNameErrorMess('');
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
                                        placeholder="amul-gold-milk"
                                        aria-invalid={fieldState.invalid}
                                        onChange={(e) => {
                                            setSlugErrorMess('');
                                            field.onChange(e);
                                        }}
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
                    <Controller name='shortDescription' control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor='shortDescription'>Short Description</FieldLabel>
                                <Input {...field} id='shortDescription'
                                    placeholder="Short description..."
                                    aria-invalid={fieldState.invalid}
                                />
                                {
                                    fieldState.invalid && <FieldError errors={[fieldState.error]} />
                                }
                            </Field>
                        )}
                    />
                </div>

                <div className="space-y-2">
                    <Controller name='description' control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor='description'>Description</FieldLabel>
                                <Textarea {...field} id='description'
                                    rows={5}
                                    placeholder="Full product description..."
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

            {/* Category */}

            <div className="rounded-2xl border p-3 md:p-4">


                <div className="flex flex-wrap gap-5">
                    <span className="w-full md:w-auto md:mr-10 text-lg font-semibold col-span-1 ">
                        Category
                    </span>

                    <div className="w-full space-y-2">
                        <Label>Select Categories</Label>

                        <div className="max-h-40 overflow-y-auto rounded-xl border bg-background p-2">
                            {isLoadingCategories ? (
                                <div className="flex flex-wrap gap-2 h-full items-center justify-start text-sm text-muted-foreground">
                                    {/* <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Loading categories... */}
                                    {[15, 20, 18, 22, 14].map((w) => <Skeleton key={w} style={{width: `${w * 4}px`}} className="h-7.5 rounded-full" />)}
                                </div>
                            ) : allCategories.length === 0 ? (
                                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                                    {categoryError || "No active categories found."}
                                </div>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {allCategories.map((category) => {
                                        const isSelected = selectedCategories.includes(
                                            category.slug
                                        );

                                        return (
                                            <button
                                                key={category.slug}
                                                type="button"
                                                onClick={() => toggleCategory(category.slug)}
                                                className={`
                                                    rounded-full border px-2.5 py-1
                                                    text-sm font-medium
                                                    transition-colors
                                                    ${isSelected
                                                        ? "border-slate-800 bg-slate-800  text-white hover:bg-slate-700"
                                                        : "border-border bg-background text-muted-foreground hover:bg-muted"
                                                    }
                                                `}
                                            >
                                                {category.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {form.formState.errors.categories && (
                            <FieldError errors={[form.formState.errors.categories]} />
                        )}
                    </div>
   
                    <div className="w-full space-y-2">
                        <Label>Select Sub Categories</Label>

                        <div className="max-h-40 overflow-y-auto rounded-xl border bg-background p-2">
                            {orderedSubcategories.length === 0 ? (
                                <div className="p-1 flex h-full items-center justify-center text-sm text-muted-foreground border border-transparent">
                                    Please select a category first.
                                </div>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                {orderedSubcategories.map((item) => {
                                    const isSelected = selectedSubcategories.includes(item);

                                    return (
                                        <button
                                            key={item}
                                            type="button"
                                            onClick={() => toggleSubcategory(item)}
                                            className={`
                                                rounded-full border px-2.5 py-1
                                                text-sm font-medium
                                                transition-colors
                                                ${isSelected
                                                    ? "border-slate-800 bg-slate-800  text-white hover:bg-slate-700"
                                                    : "border-border bg-background text-muted-foreground hover:bg-muted"
                                                }
                                            `}
                                        >
                                            {item}
                                        </button>
                                    );
                                })}
                                </div>
                            )}
                        </div>
                    </div>

                </div>

            </div>

            {/* Pricing */}

            <div className="rounded-2xl border p-3 md:p-4 space-y-4">

                <h2 className="text-lg font-semibold">
                    Pricing
                </h2>

                <div className="grid gap-5 md:grid-cols-3">

                    <div className="space-y-2">
                        <Controller name='mrp' control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor='mrp'>MRP</FieldLabel>
                                    <Input {...field} id='mrp'
                                        type="number" min={0}
                                        placeholder="50"
                                        aria-invalid={fieldState.invalid}
                                        onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                                    />
                                    {
                                        fieldState.invalid && <FieldError errors={[fieldState.error]} />
                                    }
                                </Field>
                            )}
                        />
                    </div>

                    <div className="space-y-2">
                        <Controller name='sellingPrice' control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor='sellingPrice'>Selling Price</FieldLabel>
                                    <Input {...field} id='sellingPrice'
                                        type="number" min={0}
                                        placeholder="45"
                                        aria-invalid={fieldState.invalid}
                                        onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                                    />
                                    {
                                        fieldState.invalid && <FieldError errors={[fieldState.error]} />
                                    }
                                </Field>
                            )}
                        />
                    </div>

                    <div className="space-y-2">
                        <Controller name='tax' control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor='tax'>Tax (%)</FieldLabel>
                                    <Input {...field} id='tax'
                                        type="number" min={0}
                                        placeholder="5"
                                        aria-invalid={fieldState.invalid}
                                        onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                                    />
                                    {
                                        fieldState.invalid && <FieldError errors={[fieldState.error]} />
                                    }
                                </Field>
                            )}
                        />
                    </div>

                </div>

            </div>

            {/* Product Details */}

            <div className="rounded-2xl border bg-background  p-3 md:p-4 space-y-4">

                <h2 className="text-lg font-semibold">
                    Product Details
                </h2>

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

                    <div className="space-y-2">
                        <Controller name='weight' control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor='weight'>Weight</FieldLabel>
                                    <Input {...field} id='weight'
                                        placeholder="500"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {
                                        fieldState.invalid && <FieldError errors={[fieldState.error]} />
                                    }
                                </Field>
                            )}
                        />
                    </div>

                    <div className="space-y-2">
                        <Controller name='unit' control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor='unit'>Unit</FieldLabel>

                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger id='unit'>
                                            <SelectValue placeholder="Unit" />
                                        </SelectTrigger>

                                        <SelectContent position="popper" sideOffset={4}>
                                            <SelectItem value="gm">Gram</SelectItem>
                                            <SelectItem value="kg">Kg</SelectItem>
                                            <SelectItem value="ml">ML</SelectItem>
                                            <SelectItem value="ltr">Liter</SelectItem>
                                            <SelectItem value="pcs">Pieces</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    {
                                        fieldState.invalid && <FieldError errors={[fieldState.error]} />
                                    }
                                </Field>
                            )}
                        />
                    </div>

                    <div className="space-y-2">
                        <Controller name='shelfLife' control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor='shelfLife'>Shelf Life</FieldLabel>
                                    <Input {...field} id='shelfLife'
                                        placeholder="6 Months"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {
                                        fieldState.invalid && <FieldError errors={[fieldState.error]} />
                                    }
                                </Field>
                            )}
                        />
                    </div>

                    <div className="space-y-2">
                        <Controller name='country' control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor='country'>Country</FieldLabel>
                                    <Input {...field} id='country'
                                        placeholder="India"
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

            </div>

            {/* Images */}

            <div className="rounded-2xl border bg-background  p-3 md:p-4 space-y-4">

                <h2 className="text-lg font-semibold">
                    Product Images
                </h2>

                <div className="grid gap-5 md:grid-cols-2">

                    <div className="space-y-2">
                        <Controller name='thumbnail' control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor='thumbnail'>Thumbnail</FieldLabel>
                                    <Input {...field} id='thumbnail'
                                        placeholder="https://localhost/adimn/image"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {
                                        fieldState.invalid && <FieldError errors={[fieldState.error]} />
                                    }
                                </Field>
                            )}
                        />
                    </div>

                    <div className="space-y-2">
                        <Controller name='galleryImages' control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor='galleryImages'>Gallery Images</FieldLabel>
                                    <Input {...field} id='galleryImages'
                                        placeholder="https://localhost/adimn/image, https://localhost/adimn/image"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    <p className="text-[14px] tracking-tight text-muted-foreground">
                                        Separate multiple image links with commas.
                                    </p>
                                    {
                                        fieldState.invalid && <FieldError errors={[fieldState.error]} />
                                    }
                                </Field>
                            )}
                        />
                    </div>

                </div>

            </div>

            {/* Status */}

            <div className="flex rounded-2xl border p-3 md:p-4 items-center">
                <Controller name='isActive' control={form.control}
                    render={({ field }) => (
                        <Field>
                            <FieldLabel className="mr-6 md:mr-10 text-lg font-semibold">
                                Status
                            </FieldLabel>

                            <Select
                                value={field.value ? "active" : "inactive"}
                                onValueChange={(value) => field.onChange(value === "active")}
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
                        </Field>
                    )}
                />

            </div>

            </FieldGroup>
            </FieldSet>

            {/* Buttons */}

            <div className="flex justify-end gap-3">

                <Button
                    onClick={() => {
                        form.reset();
                        setSelectedCategories([]);
                        setSelectedSubcategories([]);
                        setNameErrorMess('');
                        setSlugErrorMess('');
                    }}
                    type="button"
                    variant="outline"
                    className="p-5 cursor-pointer"
                    disabled={isLoadingPreviousInfo || isSubmitting}
                >
                    Reset
                </Button>

                <Button type="submit"
                    className="p-5 cursor-pointer disabled:cursor-not-allowed"
                    disabled={isLoadingPreviousInfo || isSubmitting || nameErrorMess.length > 0 || slugErrorMess.length > 0}
                >
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isSubmitting ? "Saving..." : id ? "Update Product" : "Save Product"}
                </Button>

            </div>

        </form>
    );
}