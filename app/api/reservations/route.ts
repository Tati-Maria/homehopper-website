import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

    if (!currentUser) return NextResponse.error();

    const body = await request.json();
    const {
        listingId,
        startDate,
        endDate,
        totalPrice,
    } = body;

    if(!listingId || !startDate || !endDate || !totalPrice) return NextResponse.error();

    const reservation = await prisma.listing.update({
        where: {
            id: listingId
        },
        data:{
            reservations: {
                create: {
                    tenantId: currentUser.id,
                    checkIn: startDate,
                    checkOut: endDate,
                    totalPrice
                }
            }
        }
    });
    return NextResponse.json(reservation);
}