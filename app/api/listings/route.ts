import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request,
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        title,
        description,
        price,
        category,
        image,
        roomCount,
        bathroomCount,
        numOfGuests,
        locationValue,
    } = body;

    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            price: parseInt(price, 10),
            category,
            image,
            roomCount,
            bathroomCount,
            numOfGuests,
            locationValue: locationValue.value,
            hostId: currentUser.id,
        }
    });

    return NextResponse.json(listing);
}