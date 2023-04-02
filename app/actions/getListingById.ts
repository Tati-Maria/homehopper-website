import prisma from "../libs/prismadb";

interface Listing {
    listingId?: string;
}

export default async function getListingById(params: Listing) {
    try {
        const { listingId } = params;
        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId
            },
            include: {
                host: true
            }
        });

        if(!listing) {
            throw new Error("Listing not found");
        }

        return {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            updatedAt: listing.updatedAt.toISOString(),
            host: {
                ...listing.host,
                createdAt: listing.host.createdAt.toISOString(),
                updatedAt: listing.host.updatedAt.toISOString(),
                emailVerified: listing.host.emailVerified?.toISOString() || null
            }
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
}