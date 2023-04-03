import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import { getCurrentUser } from "../actions/getCurrentUser";
import PropertiesClient from "./PropertiesClient";
import getListings from "../actions/getListings";


export default async function MyProperties() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                title="You must be logged in to view your properties"
                subTitle="Please login or create an account to view your properties" 
                />
            </ClientOnly>
        )
    }

    const listings = await getListings({
        userId: currentUser.id,
    });

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                title="You have no properties"
                subTitle="Please add a property to your account" 
                />
            </ClientOnly>
        )
    }

    return(
        <ClientOnly>
            <PropertiesClient listings={listings} currentUser={currentUser} />
        </ClientOnly>
    )
}