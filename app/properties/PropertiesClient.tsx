'use client'

import { SafeListing, SafeUser } from "../types";
import Container from "../components/layouts/Container";
import GridContainer from "../components/layouts/GridContainer";
import ListingCard from "../components/common/ListingCard";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import Heading from "../components/common/Heading";

interface PropertiesClientProps {
    listings: SafeListing[];
    currentUser: SafeUser | null;
}

const PropertiesClient = ({listings, currentUser}: PropertiesClientProps) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const handleDelete = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/listings/${id}`)
        .then(() => {
            toast.success('Listing deleted');
            router.refresh();
        })
        .catch(() => {
            toast.error('Something went wrong');
        })
        .finally(() => {
            setDeletingId('');
        })
    }, [ router ]);
    
  return (
    <Container>
        <Heading
        title="My Properties"
        subText={`Here are your properties, ${currentUser?.name}`} 
        />
        <GridContainer>
            {listings.map((listing) => (
                <ListingCard
                key={listing.id}
                data={listing}
                currentUser={currentUser}
                onAction={handleDelete}
                actionLabel="Delete listing"
                disabled={deletingId === listing.id}
                actionId={listing.id}
                />
            ))}
        </GridContainer>
    </Container>
  )
}

export default PropertiesClient;