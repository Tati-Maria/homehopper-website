'use client'
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { categories } from "@/app/components/nav/Categories";
import Container from "@/app/components/layouts/Container";
import ListingHead from "@/app/components/common/ListingHead";
import ListingInfo from "@/app/components/common/ListingInfo";
import useLoginModal from "@/app/hooks/useLoginModal";
//packages
//differenceInCalendarDays is used to calculate the number of days between two dates
import {eachDayOfInterval, differenceInCalendarDays} from "date-fns";
import { Range } from "react-date-range";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingReservation from "@/app/components/common/ListingReservation";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
}

interface ListingClientProps {
  reservation?: SafeReservation[];
  listing: SafeListing & {
    host: SafeUser;
  };

  currentUser?: SafeUser | null;
}

const ListingClient = ({
  listing,
  currentUser,
  reservation = [],
}: ListingClientProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const loginModal = useLoginModal();
  const router  = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    //create an array of dates between checkIn and checkOut
    reservation.forEach((r) => {
      const range = eachDayOfInterval({
        start: new Date(r.checkIn),
        end: new Date(r.checkOut),
      });

      dates = [...dates, ...range];
    });
    return dates;
  }, [reservation]);
  

  //creating a reservation
  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen();
      return;
    }

    setIsLoading(true);

    axios.post('/api/reservations', {
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing?.id,
    }).then(() => {
      toast.success('Reservation created successfully');
      setDateRange(initialDateRange);
      //redirect to trips page
      router.push('/trips');
    }).catch((err) => {
      toast.error(err.response.data.message);
    }).finally(() => {
      setIsLoading(false);
    })
  }, [currentUser, dateRange, totalPrice, listing?.id, loginModal, router]);

  //notices every change in date and calculates to the total price
  //if it coasts 50 per day and you select 3 days, the total price will be 150
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dateCount = differenceInCalendarDays(
        dateRange.endDate, 
        dateRange.startDate
        );
      if(dateCount && listing.price) {
        setTotalPrice(dateCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price])

  //memoize the category to avoid re-rendering
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
          className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'
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
             <div
             className="order-first mb-10 md:order-last md:col-span-3"
             >
              <ListingReservation
              price={listing.price}
              totalPrice={totalPrice}
              onDateChange={(value) => setDateRange(value)}
              dateRange={dateRange}
              onSubmit={onCreateReservation}
              disabledDates={disabledDates}
              disabled={isLoading}
               />
             </div>
          </div>
        </div>
      </section>
    </Container>
  )
}

export default ListingClient;