import EmptyState from "../components/EmptyState"
import ClientOnly from "../components/ClientOnly"
import { getCurrentUser } from "../actions/getCurrentUser"
import { getReservations } from "../actions/getReservetions"
import ReservationsClient from "./ReservationsClient";

export default async function MyReservations() {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                title="You are not logged in"
                subTitle="Please login to see your reservations"
                 />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({
        authorId: currentUser.id
    });

    if(reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                title="You have no reservations"
                subTitle="You can make a reservation by clicking on the 'Reserve' button on the property page"
                 />
            </ClientOnly>
        )
    }
    return(
        <ClientOnly>
            <ReservationsClient
            reservations={reservations}
            currentUser={currentUser}
             />
        </ClientOnly>
    )
}