import prisma from "../libs/prismadb";

interface IParams {
    listingId?: string;
    userId?: string;
    authorId?: string;
}

export async function getReservations(params: IParams) {
    try {
        const {
            listingId,
            userId,
            authorId
        } = params;
    
        const query: any = {};
    
        if (listingId) {
            query.listingId = listingId;
        }
    
        if (userId) {
            query.tenantId = userId;
        }
    
        if (authorId) {
            query.listing = {
                hostId: authorId
            }
        }
    
        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true,
            },
            orderBy: {
                createdAt: "desc"
            }
        });
    
        const safeReservations = reservations.map((reservation) => ({
            ...reservation,
            createdAt: reservation.createdAt.toISOString(),
            checkIn: reservation.checkIn.toISOString(),
            checkOut: reservation.checkOut.toISOString(),
            listing: {
                ...reservation.listing,
                createdAt: reservation.listing.createdAt.toISOString(),
                updatedAt: reservation.listing.updatedAt.toISOString(),
            }
    
        }))
    
        return safeReservations;
    } catch (error: any) {
        throw new Error(error);
    }
}