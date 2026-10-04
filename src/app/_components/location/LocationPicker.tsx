"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import LocationPickerContent from "./LocationPickerContent";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useEffect, useState } from "react";

type LocationPickerProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function LocationPicker({
    open,
    onOpenChange,
}: LocationPickerProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 640px)");

        const handleChange = () => setIsMobile(mediaQuery.matches);
        
        handleChange();
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
        
    }, []);
    return (
        <>
            {!isMobile ?

                // Desktop
                <Dialog open={open} onOpenChange={onOpenChange}>
                    <DialogContent className="sm:max-w-125 flex flex-col">
                        <DialogHeader>
                            <DialogTitle>Choose delivery location</DialogTitle>
                        </DialogHeader>
                        <LocationPickerContent />

                    </DialogContent>
                </Dialog>

                :

                /// Mobile 
                <Sheet open={open} onOpenChange={onOpenChange}>
                    <SheetContent
                        side="bottom"
                        className="h-[90vh] rounded-t-2xl px-2"
                    >
                        <SheetHeader>
                            <SheetTitle>
                                Choose delivery location
                            </SheetTitle>
                        </SheetHeader>

                        <div className="mt-5 h-[calc(90vh-100px)] overflow-y-auto">
                            <LocationPickerContent />
                        </div>
                    </SheetContent>
                </Sheet>
            }
        </>
    );
}