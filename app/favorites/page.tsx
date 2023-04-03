import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import { getFavorites } from "../actions/getFavorites";

import { getCurrentUser } from "../actions/getCurrentUser";
import FavoritesClient from "./FavoritesClient";

const MyFavorites = async () => {
  const listings = await getFavorites();
  const currentUser = await getCurrentUser();

  if(listings?.length === 0) return (
    <ClientOnly>
      <EmptyState
        title="No Favorites found"
        subTitle="You have no favorites yet. Add some!"
      />
  </ClientOnly>
  )

  return (
    <ClientOnly>
      <FavoritesClient
        listings={listings}
        currentUser={currentUser}
       />
    </ClientOnly>
  )
}

export default MyFavorites