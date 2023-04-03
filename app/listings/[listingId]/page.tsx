import { getCurrentUser } from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import { getReservations } from "@/app/actions/getReservetions";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "@/app/listings/[listingId]/ListingClient";

interface Listing {
    listingId?: string;
}

const ListingDetail = async ({params}: {params: Listing}) => {
    const listing = await getListingById(params);
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser();

    if(!listing) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }
    return (
       <ClientOnly>
        <ListingClient
        listing={listing}
        reservation={reservations}
        currentUser={currentUser}
        /> 
       </ClientOnly>
    )
}

export default ListingDetail;