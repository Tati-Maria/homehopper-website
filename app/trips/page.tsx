import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import { getCurrentUser } from "../actions/getCurrentUser";
import { getReservations } from "../actions/getReservetions";
import TripClient from "./TripClient";

export default async function Trips() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                title="You're not signed in, please sign in before booking a trip"
                subTitle="We only allow users who've signed in to book a listing."
                 />
            </ClientOnly>
        );
    }

    const reservations = await getReservations({ userId: currentUser.id });

    if(!reservations || reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                title="You have no reservations"
                subTitle="You can browse listings in the 'Explore' tab."
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <TripClient
            currentUser={currentUser}
            reservations={reservations} 
            />
        </ClientOnly>
    )
}