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

export default function CategoryForm() {
    return (
        <form className="space-y-4">

            {/* Basic Information */}

            <div className="rounded-2xl border bg-background p-3 md:p-4 space-y-4">

                <h2 className="text-lg font-semibold">
                    Basic Information
                </h2>

                <div className="grid gap-5 md:grid-cols-2">

                    <div className="space-y-2">
                        <Label>Category Name</Label>
                        <Input placeholder="Vegetables" />
                    </div>

                    <div className="space-y-2">
                        <Label>Slug</Label>
                        <Input placeholder="vegetables" />
                    </div>

                </div>

                <div className="space-y-2">
                    <Label>Description</Label>

                    <Textarea
                        rows={5}
                        placeholder="Write category description..."
                    />
                </div>

            </div>

            {/* Category Image */}

            <div className="rounded-2xl border bg-background  p-3 md:p-4 space-y-4">

                <h2 className="text-lg font-semibold">
                    Category Image
                </h2>

                <div className="space-y-2">
                    <Label>Upload Image</Label>

                    <Input
                        type="text"
                        placeholder="https://localhost/adimn/image"
                        accept="image/*"
                    />
                </div>

            </div>

            {/* Status */}

            <div className="flex rounded-2xl border  p-3 md:p-4">

                <h2 className="mr-6 md:mr-10 text-lg font-semibold">
                    Status
                </h2>

                <Select defaultValue="active">

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

            {/* Buttons */}

            <div className="flex justify-end gap-3">

                <Button
                    type="button"
                    variant="outline"
                    className="p-5"
                >
                    Cancel
                </Button>

                <Button type="submit"
                    className="p-5">
                    Save Category
                </Button>

            </div>

        </form>
    );
}