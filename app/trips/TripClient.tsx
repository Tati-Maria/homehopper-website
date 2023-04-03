'use client'

import { useCallback, useState } from "react";
import Heading from "../components/common/Heading";
import Container from "../components/layouts/Container";

import { SafeReservation, SafeUser } from "../types";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { error } from "console";
import ListingCard from "../components/common/ListingCard";
import GridContainer from "../components/layouts/GridContainer";

interface TripClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;

}

const TripClient = ({reservations, currentUser}: TripClientProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/reservations/${id}`)
    .then(() => {
      toast.success('Reservation cancelled successfully!');
      router.refresh();
    }).catch((error) => {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }).finally(() => {
      setDeletingId('');
    });
  }, [router]);

  return (
    <Container>
      <Heading
        title="My Trips"
        subText="Here you can see all your trips"
       />
       <GridContainer>
        {reservations.map((reservation) => (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId === reservation.id}
              actionLabel="Cancel Reservation"
              currentUser={currentUser}
            />
          ))}
       </GridContainer>
    </Container>
  )
}

export default TripClient;