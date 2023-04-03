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
        {/* <section className="pt-28 grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h1
            className="text-4xl font-semibold my-2" 
            >
              Welcome to <span className=" text-extra-violet uppercase">Homehopper</span>
            </h1>
            <p>
              Homehopper is a web application that connects travelers with unique and affordable accommodations around the world. Book your stay today and start exploring!
            </p>
          </div>
          <figure>
            <Image
            src='/hero-img.png'
            alt='two people jumping holding suitcases'
            width={500}
            height={500} 
            />
          </figure>
        </section> */}
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
