import {User, Listing, Reservation} from "@prisma/client"


export type SafeUser = Omit<User, 'createdAt' | 'updatedAt' | "emailVerified"> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};

export type SafeListing = Omit<Listing, 'createdAt' | 'updatedAt'> & {
    createdAt: string;
    updatedAt: string;
};

export type SafeReservation = Omit<Reservation, 'createdAt' | 'listing' | 'checkIn' | 'checkOut'> & {
    createdAt: string;
    listing: SafeListing;
    checkIn: string;
    checkOut: string;
}