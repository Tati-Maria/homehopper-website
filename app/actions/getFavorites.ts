import prisma from "../libs/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export const getFavorites = async () => {
    try {
        const currentUser = await getCurrentUser();

        if(!currentUser) return null;

        const favorites = await prisma.listing.findMany({
            where: {
                id: {
                    in: [...(currentUser.favoriteIds || [])]
                }
            }
        });

        const safeFavorites = favorites.map((favorite) => ({
            ...favorite,
            createdAt: favorite.createdAt.toISOString(),
            updatedAt: favorite.updatedAt.toISOString(),
        }));

        return safeFavorites;
    } catch (error: any) {
        throw new Error(error);
    }
}