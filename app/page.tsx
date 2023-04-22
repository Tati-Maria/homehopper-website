import { getCurrentUser } from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/common/ListingCard";
import Container from "./components/layouts/Container";

interface HomeProps {
  searchParams: IListingsParams;
}


const Home = async ({searchParams}: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showResetButton />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Container>
        <section
        className="pt-24 grid grid-cols-fluid-2 gap-8"
        >
          {listings.map((listing) => (
            <ListingCard currentUser={currentUser} key={listing.id} data={listing} />
          ))}
        </section>
      </Container>
    </ClientOnly>
  )
}

export default Home;
