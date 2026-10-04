"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Loader2, MapPin, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounceCallback } from 'usehooks-ts';
import { toast } from "sonner";
import { Map, MapTileLayer } from "@/components/ui/map";

type LocationResult = {
    id: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
};
const popularLocations: LocationResult[] = [
    {
        name: "SaltLake City",
        address: "SaltLake City, Kolkata, West Bengal, India",
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
];



export default function LocationPickerContent() {

    const [search, setSearch] = useState(""); // for store debounced value
    const [temp, setTemp] = useState(""); // for input field value 
    const debounced = useDebounceCallback(setSearch, 800);

    const [results, setResults] = useState<LocationResult[]>([]);
    const [loading, setLoading] = useState(false);

    const [selectedLocation, setSelectedLocation] = useState<LocationResult | null>(null);


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

                const locations: LocationResult[] = data.features.map(
                    (feature: any) => ({
                        id: feature.id,
                        name:
                            feature.text ||
                            feature.place_name ||
                            "Unknown location",
                        address: feature.place_name || "",
                        longitude: feature.center[0],
                        latitude: feature.center[1],
                    })
                );
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


    return (
        <Tabs defaultValue="search" className="min-h-[50vh] w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="search" className="">
                    Search
                </TabsTrigger>

                <TabsTrigger value="saved">
                    Saved Addresses
                </TabsTrigger>
            </TabsList>

            {/* Choose Location */}
            <TabsContent value="search" className="mt-5">
                <div className="space-y-4">

                    {/* Detect location section */}
                    <div className="truncate">
                        <label className="mb-2 block text-sm font-medium">
                            Use current location
                        </label>

                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-1 rounded-md border px-2 py-2 font-medium disabled:opacity-50 bg-green-600 text-white transition-colors truncate"
                        >
                            <MapPin
                                size={18}
                                className=""
                            />
                            Detect your location automatically
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
                                        onClick={() => { setTemp(""); debounced("") }}
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

                    {/* {selectedLocation && (
                        <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                            <div className="flex items-start gap-3">
                                <MapPin
                                    size={20}
                                    className="mt-0.5 shrink-0 text-emerald-600"
                                />

                                <div className="min-w-0">
                                    <p className="text-sm font-semibold">
                                        {selectedLocation.name}
                                    </p>

                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {selectedLocation.address}
                                    </p>

                                    <p className="mt-2 text-[11px] text-muted-foreground">
                                        {selectedLocation.latitude.toFixed(6)},{" "}
                                        {selectedLocation.longitude.toFixed(6)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )} */}


                    {
                        selectedLocation &&
                        <div className="mt-5 overflow-hidden rounded-xl border-2 h-70">
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
                            </Map>
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
                                            <MapPin size={18} className="shrink-0 text-muted-foreground" />
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
                <div className="rounded-lg border border-dashed p-8 text-center">
                    <MapPin
                        size={28}
                        className="mx-auto mb-3 text-muted-foreground"
                    />

                    <p className="text-sm font-medium">
                        No saved addresses
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                        Your saved delivery addresses will appear here.
                    </p>
                </div>
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

