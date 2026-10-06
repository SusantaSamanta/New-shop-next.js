"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Loader2, MapPin, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounceCallback } from 'usehooks-ts';
import { toast } from "sonner";
import { Map, MapTileLayer } from "@/components/ui/map";
import { useMapEvents } from "react-leaflet";
import axios from "axios";
import SavedAddresses, { SavedAddress } from "./SavedAddresses";
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

const popularLocations: LocationResult[] = [
    {
        name: "SaltLake City",
        address: "SaltLake City, Kolkata, West Bengal, India",
        id: "place.4658358",
        city: "",
        state: "",
        country: "",
        pincode: "",
        latitude: 22.595857570530875,
        longitude: 88.40670347213745,
    },
    {
        name: "Howrah Maidan",
        address: "Howrah Maidan, Kolkata, West Bengal, India",
        id: "place.3514356",
        city: "",
        state: "",
        country: "",
        pincode: "",
        latitude: 22.581973707329496,
        longitude: 88.33330750465393,
    },
    {
        name: "Park Street",
        address: "Park Street, 700 016 Kolkata, West Bengal, India",
        id: "address.12469967",
        city: "",
        state: "",
        country: "",
        pincode: "",
        latitude: 22.548900451108363,
        longitude: 88.35796438157558,
    },
    {
        name: "DumDum Road",
        address: "DumDum Road, 700 030 Kolkata Metropolitan Area, West Bengal, India",
        id: "address.17345041",
        city: "",
        state: "",
        country: "",
        pincode: "",
        latitude: 22.619303202529196,
        longitude: 88.39229866862297,
    },
    {
        name: "Lake Town",
        address: "Lake Town, Kolkata Metropolitan Area, West Bengal, India",
        id: "place.655404",
        city: "",
        state: "",
        country: "",
        pincode: "",
        latitude: 22.605727817339595,
        longitude: 88.4029607847333,
    }
];

function MapMovementHandler({
    onLocationChange,
}: {
    onLocationChange: (latitude: number, longitude: number) => void;
}) {
    useMapEvents({
        moveend(event) {
            const center = event.target.getCenter();

            onLocationChange(center.lat, center.lng);
        },
    });

    return null;
}

export default function LocationPickerContent({ onService, availableLocation, editAddress }: {
    onService: () => void;
    availableLocation: (location: LocationResult | null) => void;
    editAddress: (editLoc: EditAddressType | null) => void;
}) {

    const [search, setSearch] = useState(""); // for store debounced value
    const [temp, setTemp] = useState(""); // for input field value 
    const debounced = useDebounceCallback(setSearch, 800);

    const [results, setResults] = useState<LocationResult[]>([]);
    const [loading, setLoading] = useState(false);

    const [selectedLocation, setSelectedLocation] = useState<LocationResult | null>(null);

    const [currentLati, setCurrentLati] = useState<number | null>(null);
    const [currentLong, setCurrentLong] = useState<number | null>(null);


    useEffect(() => {
        async function fetchMapApi() {
            if (search.trim().length < 3) {
                setResults([]);
                return;
            }
            try {
                setLoading(true);
                const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;
                const response = await fetch(`https://api.maptiler.com/geocoding/${encodeURIComponent(search)}.json?key=${apiKey}&country=in&language=en`);

                if (!response.ok)
                    throw new Error("Failed to search location");


                const data = await response.json();

                const locations: LocationResult[] =
                    data.features.map((feature: any) => {

                        const city = feature.context?.find((item: any) => item.id.startsWith("place"))?.text || "";

                        const state = feature.context?.find((item: any) => item.id.startsWith("region"))?.text || "";

                        const country = feature.context?.find((item: any) => item.id.startsWith("country"))?.text || "";

                        // const pincode =
                        //     feature.properties?.postcode ||
                        //     feature.context?.find((item: any) =>
                        //         item.id.startsWith("postcode")
                        //     )?.text || "";

                        return {
                            id: feature.id,
                            name: feature.text || feature.place_name || "Unknown location",
                            address: feature.place_name || "",

                            city,
                            state,
                            country,
                            // pincode,

                            longitude: feature.center[0],
                            latitude: feature.center[1],
                        };
                    });
                console.log("Api Location: ", locations)
                setResults(locations);

            } catch (error) {
                toast.error("Location search error");
                setResults([]);
            } finally {
                setLoading(false);
            }
        }

        fetchMapApi();
    }, [search]);

    useEffect(() => {
        const getLocation = async () => {
            console.log(currentLati, currentLong)
            if (currentLati === null || currentLong === null) {
                return;
            }
            try {
                const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;

                const response = await fetch(`https://api.maptiler.com/geocoding/${currentLong},${currentLati}.json?key=${apiKey}&country=in&language=en`);

                if (!response.ok) throw new Error("Failed to fetch location");

                const data = await response.json();
                const feature = data.features?.[0];
                if (!feature) return;

                const city =
                    feature.context?.find((item: any) =>
                        item.id.startsWith("place")
                    )?.text || feature.text || "";

                const state =
                    feature.context?.find((item: any) =>
                        item.id.startsWith("region")
                    )?.text || "";

                const country =
                    feature.context?.find((item: any) =>
                        item.id.startsWith("country")
                    )?.text || "";

                // const pincode =
                //     feature.properties?.postcode ||
                //     feature.context?.find((item: any) =>
                //         item.id.startsWith("postcode")
                //     )?.text ||
                //     "";

                setSelectedLocation({
                    id: feature.id,
                    name: feature.text || "Unknown location",
                    address: feature.place_name || "",
                    city,
                    state,
                    country,
                    // pincode,
                    latitude: currentLati,
                    longitude: currentLong,
                });
            } catch (error) {
                console.error("Reverse geocoding error:", error);
            }
        };

        getLocation();
    }, [currentLati, currentLong]);

    const [isServicesAvailable, setIsServicesAvailable] = useState(false);
    const [isCheckingService, setIsCheckingService] = useState(false);

    const onSelectAddressEdit = (address: SavedAddress) => {
        onService(); // Next step: open address details form for edit
        console.log(address)
        editAddress({
            addressId: address.id,
            apiAddress: address.apiAddress,
            house: address.house,
            street: address.street,
            landmark: address.landmark,
            label: address.label,
            pincode: address.pincode,
        });
        availableLocation(null)
        // toast.success("Address selectedssssssssssss");
    };

    const handleConfirmLocation = async () => {
        if (selectedLocation?.latitude === null || selectedLocation?.longitude === null) {
            toast.error("Please select a location first");
            return;
        }

        try {
            setIsCheckingService(true);
            const response = await axios.post(
                "/api/location/check-serviceability", {
                latitude: selectedLocation?.latitude,
                longitude: selectedLocation?.longitude,
            });

            const data = response.data;

            if (!data.available) {
                toast.error(data.message || "FreshNext is not available at this location");
                return;
            }

            console.log("Serviceable location:", data);

            toast.success("FreshNext is available at this location");

            onService(); // Next step: open address details form
            availableLocation(selectedLocation)
            editAddress(null);

        } catch (error) {
            console.error("Serviceability check error:", error);
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Failed to check serviceability");
            } else {
                toast.error("Something went wrong");
            }
            setIsServicesAvailable(false);
        } finally {
            setIsCheckingService(false);
        }
    };


    const [detectingLocation, setDetectingLocation] = useState(false);
    async function handleCurrentLocation() {
        setDetectingLocation(true)

        function gotLocation(position: any) {
            console.log(position.coords.latitude, position.coords.longitude, position)
            setCurrentLati(position.coords.latitude);
            setCurrentLong(position.coords.longitude);
            setDetectingLocation(false);
        }
        function failed(err: any) {
            if (err.message === "User denied Geolocation") {
                toast.error("Location permission denied!")
            } else {
                toast.error("Please turnon your location")
            }
            setDetectingLocation(false);
        }
        await navigator.geolocation.getCurrentPosition(gotLocation, failed);
    }




    return (
        <Tabs defaultValue="search" className="min-h-140 w-full">
            <TabsList className="grid w-full grid-cols-2 sticky top-0">
                <TabsTrigger value="search" className="">
                    Search
                </TabsTrigger>

                <TabsTrigger value="saved">
                    Saved Addresses
                </TabsTrigger>
            </TabsList>

            {/* Choose Location */}
            <TabsContent value="search" className="mt-4">
                <div className="space-y-4">

                    {/* Detect location section */}
                    <div className="truncate">
                        <label className="mb-2 block text-sm font-medium">
                            Use current location
                        </label>

                        <button
                            type="button"
                            onClick={() => handleCurrentLocation()}
                            disabled={detectingLocation}
                            className="w-full flex items-center justify-center gap-1 rounded-md border px-2 py-2 font-medium disabled:opacity-50 bg-green-600 text-white transition-colors truncate"
                        >
                            <MapPin
                                size={18}
                                strokeWidth={0.5}
                                className="fill-white [&_circle]:fill-green-600"
                            />
                            {detectingLocation ? "Detecting...." : "Detect location"}
                        </button>
                    </div>


                    {/* Search section */}
                    {
                        // !selectedLocation &&
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Search delivery location
                            </label>

                            <div className="relative">
                                <Search
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                />

                                {temp.trim().length > 0 &&
                                    <X
                                        onClick={() => { setTemp(""); debounced(""); setSelectedLocation(null) }}
                                        size={18}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                    />
                                }

                                <Input
                                    value={temp}
                                    onChange={(e) => {
                                        debounced(e.target.value)
                                        setTemp(e.target.value)
                                    }}
                                    placeholder="Search area, street, pincode..."
                                    className="h-10 pl-10 py-0"
                                />
                            </div>
                            {search.trim().length >= 3 && (
                                <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                                    {loading ? (
                                        <>
                                            <Loader2
                                                size={15}
                                                className="animate-spin"
                                            />
                                            Searching locations...
                                        </>
                                    ) : (
                                        <>Searching for: {search}</>
                                    )}
                                </p>
                            )}

                        </div>
                    }


                    {/* Search Results */}
                    {search.trim().length >= 3 && !selectedLocation && (
                        <div>
                            <p className="mb-2 text-sm font-medium">
                                Search results
                            </p>

                            <div className="space-y-1">
                                {results.length > 0 ? (
                                    results.map((location) => (
                                        <button
                                            key={location.id}
                                            onClick={() => {
                                                setSelectedLocation(location);
                                            }}
                                            type="button"
                                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition hover:bg-muted"
                                        >
                                            <MapPin
                                                size={18}
                                                className="shrink-0 text-muted-foreground"
                                            />

                                            <div>
                                                <p className="text-sm font-medium">
                                                    {location.name}
                                                </p>

                                                <p className="text-xs text-muted-foreground">
                                                    {location.address}
                                                </p>
                                            </div>
                                        </button>
                                    ))
                                ) : (
                                    <p className="py-6 text-center text-sm text-muted-foreground">
                                        No locations found
                                    </p>
                                )}
                            </div>
                        </div>
                    )}




                    {selectedLocation &&
                        <div>
                            <div className="relative mt-4 overflow-hidden rounded-t-xl border-2 h-70">
                                <Map
                                    center={
                                        selectedLocation
                                            ? [
                                                selectedLocation.latitude,
                                                selectedLocation.longitude,
                                            ]
                                            : [22.548900451108363, 88.35796438157558]
                                    }
                                    zoom={16}
                                    className="h-full w-full"
                                >
                                    <MapTileLayer
                                        url={`https://api.maptiler.com/maps/streets-v4/256/{z}/{x}/{y}.png?key=${process.env.NEXT_PUBLIC_MAPTILER_API_KEY}`}
                                        attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; OpenStreetMap contributors'
                                    />
                                    <MapMovementHandler
                                        onLocationChange={(latitude, longitude) => {
                                            setCurrentLati(latitude);
                                            setCurrentLong(longitude);
                                        }}
                                    />
                                </Map>
                                {/* Fixed center pin */}
                                <div className="pointer-events-none absolute left-1/2 top-1/2 z-1000 -translate-x-1/2 -translate-y-full">
                                    <MapPin
                                        size={42}
                                        strokeWidth={1}
                                        className="fill-emerald-600 [&_circle]:fill-white text-white drop-shadow-md"
                                    />
                                </div>
                            </div>

                            {/* Save Selected address Section */}
                            <div className="rounded-b-xl bg-gray-100 px-4 pt-2 pb-4 mb-4 sm:mb-0 border shadow-lg">
                                {/* Selected Location */}
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex min-w-0 items-center gap-3">
                                        {/* Location Icon */}
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 dark:bg-emerald-500/10">
                                            <MapPin
                                                size={21}
                                                strokeWidth={1}
                                                className="fill-emerald-600 text-emerald-600 [&_circle]:fill-white"
                                            />
                                        </div>

                                        {/* Location Details */}
                                        <div className="min-w-0">
                                            <p className="text-xs font-medium text-gray-500">
                                                Selected location
                                            </p>

                                            <p className="truncate text-sm font-semibold text-gray-900">
                                                {selectedLocation.name}, {selectedLocation.address}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Confirm Button */}
                                <button
                                    type="button"
                                    onClick={handleConfirmLocation}
                                    disabled={isCheckingService}
                                    className="mt-2 w-full rounded-xl bg-green-600 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-700 active:scale-[0.99]"
                                >
                                    {isCheckingService ? "Checking...." : "Confirm Location"}
                                </button>
                            </div>
                        </div>
                    }



                    {/* Popular Locations */}
                    {search.trim().length < 3 && !selectedLocation &&
                        <div>
                            <p className="mb-3 text-sm font-medium">Popular locations</p>
                            <div className="space-y-1">
                                {
                                    popularLocations.map((loc) => (
                                        <button
                                            key={loc.id}
                                            onClick={() => {
                                                setSelectedLocation(loc);
                                                setTemp(loc.name);
                                            }}
                                            type="button"
                                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition hover:bg-muted"
                                        >
                                            <MapPin size={18} strokeWidth={0.5} className="fill-muted-foreground [&_circle]:fill-card" />
                                            <div>
                                                <p className="text-sm font-medium">{loc.name}</p>
                                                <p className="text-xs text-muted-foreground">{loc.address}</p>
                                            </div>
                                        </button>
                                    ))
                                }
                            </div>
                        </div>
                    }
                </div>

            </TabsContent>



            {/*/////////// Save address ///////////////////////*/}
            <TabsContent value="saved" className="mt-5">
                <SavedAddresses onEdit={onSelectAddressEdit} />
            </TabsContent>




        </Tabs>
    );
}



/*

{
    name: "SaltLake City",
    addres:"SaltLake City, Kolkata, West Bengal, India",
    id: "place.4658358",
    latitude: 22.595857570530875,
    longitude: 88.40670347213745,
},
{
    name: "Howrah Maidan",
    address: "Howrah Maidan, Kolkata, West Bengal, India",
    id: "place.3514356",
    latitude: 22.581973707329496,
    longitude: 88.33330750465393,
},
{
    name: "Park Street",
    address: "Park Street, 700 016 Kolkata, West Bengal, India",
    id: "address.12469967",
    latitude: 22.548900451108363,
    longitude: 88.35796438157558,
},
{
    name: "DumDum Road",
    address: "DumDum Road, 700 030 Kolkata Metropolitan Area, West Bengal, India",
    id: "address.17345041",
    latitude: 22.619303202529196,
    longitude: 88.39229866862297,
},
{
    name: "Lake Town",
    address: "Lake Town, Kolkata Metropolitan Area, West Bengal, India",
    id: "place.655404",
    latitude: 22.605727817339595,
    longitude: 88.4029607847333,
}

*/

