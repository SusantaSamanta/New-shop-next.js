"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import LocationPickerContent from "./LocationPickerContent";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import AddressForm from "./AddressForm";
import { ArrowLeft } from "lucide-react";
import { EditAddressType } from "@/type/addressTypes";


type LocationResult = {
    id: string;
    name: string;
    address: string;

    city: string;
    state: string;
    country: string;
    pincode?: string;

    latitude: number;
    longitude: number;
};

type LocationPickerProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function LocationPicker({
    open,
    onOpenChange,
}: LocationPickerProps) {

    const [isMobile, setIsMobile] = useState(false);
    const [isServicesAvailable, setIsServicesAvailable] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<LocationResult | null>(null);
    const [editLocation, setEditLocation] = useState<EditAddressType | null>(null);
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 640px)");
        const handleChange = () => setIsMobile(mediaQuery.matches);
        handleChange();
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);




    return (
        <>
            {
                !isMobile ?

                    // Desktop
                    <Dialog open={open} onOpenChange={() => {
                        onOpenChange(false);
                        setSelectedLocation(null);
                        setIsServicesAvailable(false);
                    }}>
                        <DialogContent className="sm:max-w-125 flex flex-col">
                            {isServicesAvailable ?
                                <> <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2 relative -top-1">
                                        <button
                                            type="button"
                                            onClick={() => setIsServicesAvailable(false)}
                                            className="rounded-full p-1.5 transition-colors hover:bg-gray-100"
                                        >
                                            <ArrowLeft size={18} />
                                        </button>
                                        Add delivery address
                                    </DialogTitle>
                                </DialogHeader>
                                    <AddressForm
                                        selectedLocation={selectedLocation}
                                        editAddress={editLocation}
                                        dealerId={"dealerId"!}
                                        onClose={() => { onOpenChange(false); setIsServicesAvailable(false); setSelectedLocation(null) }}
                                    />
                                </>
                                :
                                <>
                                    <DialogHeader>
                                        <DialogTitle>Choose delivery location</DialogTitle>
                                    </DialogHeader>
                                    <LocationPickerContent
                                        onService={() => setIsServicesAvailable(true)}
                                        availableLocation={(loc) => setSelectedLocation(loc)}
                                        editAddress={(loc) => {setEditLocation(loc)}}
                                    />
                                </>

                            }
                        </DialogContent>
                    </Dialog>

                    :

                    /// Mobile 
                    <Sheet open={open} onOpenChange={() => {
                        onOpenChange(false);
                        setSelectedLocation(null);
                        setIsServicesAvailable(false);
                    }}>
                        <SheetContent
                            side="bottom"
                            className="h-[90vh] rounded-t-2xl px-2"
                        >
                            {isServicesAvailable ?
                                <>
                                    <SheetHeader>
                                        <SheetTitle className="flex items-center gap-2 relative -top-1 pl-1">
                                            <button
                                                type="button"
                                                onClick={() => setIsServicesAvailable(false)}
                                                className="rounded-full md:p-1.5 transition-colors hover:bg-gray-100"
                                            >
                                                <ArrowLeft size={18} />
                                            </button>
                                            Add delivery address
                                        </SheetTitle>
                                    </SheetHeader>
                                    <AddressForm
                                        selectedLocation={selectedLocation}
                                        editAddress={editLocation}
                                        dealerId={"dealerId"!}
                                        onClose={() => { onOpenChange(false); setIsServicesAvailable(false); setSelectedLocation(null) }}
                                    />
                                </>
                                :
                                <>

                                    <SheetHeader className="pb-0 pl-1">
                                        <SheetTitle>
                                            Choose delivery location
                                        </SheetTitle>
                                    </SheetHeader>

                                    <div className="h-[calc(90vh-100px)] overflow-y-auto">
                                        <LocationPickerContent
                                            onService={() => setIsServicesAvailable(true)}
                                            availableLocation={(loc) => setSelectedLocation(loc)}
                                            editAddress={(loc) => setEditLocation(loc)}
                                        />
                                    </div>

                                </>
                            }
                        </SheetContent>
                    </Sheet>

            }
        </>
    );
}