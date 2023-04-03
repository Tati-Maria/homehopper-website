import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

interface IParams {
    listingId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) return NextResponse.error();

    const { listingId } = params;

    if(!listingId || typeof listingId !== 'string') throw new Error('Invalid listing id');

    const listing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            hostId: currentUser.id
        }
    });

    return NextResponse.json(listing);
}