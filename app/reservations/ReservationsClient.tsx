'use client'

import { SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import { Toast, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

import Heading from "../components/common/Heading";
import Container from "../components/layouts/Container";
import ListingCard from "../components/common/ListingCard";

interface ReservationsClientProps {
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;
}

const ReservationsClient = ({reservations, currentUser}: ReservationsClientProps) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success('Reservation cancelled successfully! 😀');
            router.refresh();
        }).catch((error) => {
            toast.error(error?.response?.data?.message || 'Something went wrong');
        }).finally(() => {
            setDeletingId('');
        });
    }, [ router ]);


  return (
    <Container>
        <Heading
            title="Reservations"
            subText="Bookings on your listings"
        />
        <section
        className="grid gap-8 grid-cols-fluid-2 mt-10"
        >
            {reservations.map((reservation) => (
                <ListingCard
                key={reservation.id}
                data={reservation.listing}
                reservation={reservation}
                actionId={reservation.id}
                onAction={onCancel}
                disabled={deletingId === reservation.id} 
                actionLabel="Cancel guest's reservation"
                currentUser={currentUser}
                />
            ))}
        </section>
    </Container>
  )
}

export default ReservationsClient