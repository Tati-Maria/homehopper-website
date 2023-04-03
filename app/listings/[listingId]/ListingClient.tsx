'use client'

import { SafeListing, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import { useMemo } from "react";
import { categories } from "@/app/components/nav/Categories";
import Container from "@/app/components/layouts/Container";
import ListingHead from "@/app/components/common/ListingHead";
import ListingInfo from "@/app/components/common/ListingInfo";

interface ListingClientProps {
  reservation?: Reservation[];
  listing: SafeListing & {
    host: SafeUser;
  };

  currentUser?: SafeUser | null;
}

const ListingClient = ({
  listing,
  currentUser,
}: ListingClientProps) => {

  const category = useMemo(() => {
    return categories.find((c) => c.label === listing.category);
  }, [listing.category]);
  
  return (
    <Container>
      <section
      className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="flex flex-col gap-6">
          <ListingHead
          title={listing.title}
          imageSrc={listing.image}
          locationValue={listing.locationValue}
          id={listing.id}
          currentUser={currentUser} 
          />
          <div
          className='grid grid-cols-fluid-2 md:gap-10 mt-6'
          >
            <ListingInfo
            host={listing.host}
            category={category}
            description={listing.description}
            roomCount={listing.roomCount}
            guestCount={listing.numOfGuests}
            bathroomCount={listing.bathroomCount}
            locationValue={listing.locationValue}
             />
          </div>
        </div>
      </section>
    </Container>
  )
}

export default ListingClient;