import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

interface IParams {
    reservationId: string;
}

export async function DELETE(request: Request, {params}: {params: IParams}) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { reservationId } = params;

    if(!reservationId || typeof reservationId !== 'string') {
       throw new Error('Invalid reservation id');
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                {tenantId: currentUser.id},
                {listing: {hostId: currentUser.id}}
            ]
        }
    });
    
    return NextResponse.json(reservation);
}