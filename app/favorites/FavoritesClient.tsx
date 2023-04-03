import Heading from "../components/common/Heading";
import Container from "../components/layouts/Container";
import GridContainer from "../components/layouts/GridContainer";
import ListingCard from "../components/common/ListingCard";
import { SafeListing, SafeUser } from "../types"

interface FavortitesClientProps {
    listings: SafeListing[] | null;
    currentUser?: SafeUser | null;
}

const FavoritesClient = ({listings, currentUser}: FavortitesClientProps) => {
  return (
    <Container>
        <Heading
        title="My Favorites"
        subText={`Here are your favorite listings, ${currentUser?.name}`}
         />
        <GridContainer>
            {listings?.map((listing) => (
                <ListingCard
                key={listing.id}
                data={listing}
                currentUser={currentUser}
                />
            ))}
        </GridContainer>
    </Container>
  )
}

export default FavoritesClient