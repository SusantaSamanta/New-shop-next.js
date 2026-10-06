import { NextRequest, NextResponse } from "next/server";

const DUMMY_DEALER = {
    id: "dealer_dummy_001",
    latitude: 22.595857570530875,
    longitude: 88.40670347213745,
    serviceRadiusKm: 5,
};


function calculateDistance(
    latitude1: number,
    longitude1: number,
    latitude2: number,
    longitude2: number
) {
    const earthRadiusKm = 6371;

    const dLatitude = ((latitude2 - latitude1) * Math.PI) / 180;
    const dLongitude = ((longitude2 - longitude1) * Math.PI) / 180;

    const a =
        Math.sin(dLatitude / 2) ** 2 +
        Math.cos((latitude1 * Math.PI) / 180) *
        Math.cos((latitude2 * Math.PI) / 180) *
        Math.sin(dLongitude / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadiusKm * c;
}

async function wait() {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
}
export async function POST(request: NextRequest) {
    await wait()
    try {
        const body = await request.json();

        const { latitude, longitude } = body;

        if (
            typeof latitude !== "number" ||
            typeof longitude !== "number"
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Latitude and longitude are required",
                },
                { status: 400 }
            );
        }

        const distance = calculateDistance(
            latitude,
            longitude,
            DUMMY_DEALER.latitude,
            DUMMY_DEALER.longitude
        );

        const isAvailable = distance <= DUMMY_DEALER.serviceRadiusKm;

        if (!isAvailable) {
            return NextResponse.json({
                success: true,
                available: false,
                dealerId: null,
                distanceKm: Number(distance.toFixed(2)),
                message: "Sorry, FreshNext is not available at this location.",
            });
        }

        return NextResponse.json({
            success: true,
            available: true,
            dealerId: DUMMY_DEALER.id,
            distanceKm: Number(distance.toFixed(2)),
            message: "FreshNext is available at this location.",
        });
    } catch (error) {
        console.error("Serviceability check error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to check serviceability",
            },
            { status: 500 }
        );
    }
}






