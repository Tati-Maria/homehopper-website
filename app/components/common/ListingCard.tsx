'use client'
import { useCountries } from "@/app/hooks/useCountries";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import {format} from "date-fns";
import Image from "next/image";
import HeartButton from "./HeartButton";
import Button from "./Button";

interface ListingCardProps {
    data: SafeListing;
    reservation?: SafeReservation
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

export default function ListingCard ({
    data,
    reservation,
    onAction,
    disabled,
    actionId = '',
    actionLabel,
    currentUser
}: ListingCardProps) {
    const router = useRouter();
    const {getByValue} = useCountries();
    
    const location = getByValue(data.locationValue);
    //
    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if(disabled) {
            return;
        }

        onAction?.(actionId)
    }, [onAction, actionId, disabled]);

    // price to display 
    const price = useMemo(() => {
        if(reservation) {
            return reservation.totalPrice;
        }

        return data.price;
    }, [reservation, data.price]);

    // format date range
    const reservationDate = useMemo(() => {
        if(!reservation) {
            return;
        }

        const start = new Date(reservation.checkIn);
        const end = new Date(reservation.checkOut);

        return `${format(start, 'PP')} - ${format(end, 'PP')}`

    }, [reservation]);

    return (
        <div
        onClick={() => router.push(`/listings/${data.id}`)}
        className='
        col-span-1
        cursor-pointer
        group
        '
        >
            <div
            className='relative flex flex-col gap-2 w-full'
            >
                <figure
                className='aspect-square w-full relative overflow-hidden rounded-xl'
                >
                    <Image
                    width={400}
                    height={400}
                    priority
                    src={data.image}
                    alt={data.title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300 ease-in-out"
                     />
                    <div className="absolute top-3 right-3">
                        <HeartButton listingId={data.id} currentUser={currentUser} />
                    </div>
                </figure>
                <address
                className='not-italic text-neutral-900 font-semibold' 
                >
                    {location?.label}, {location?.region}
                </address>
                <small className="text-neutral-700 ">
                    {reservationDate || data.category} 
                </small>
                <div
                className='flex items-center gap-2'
                >
                    <p className="font-semibold">
                        $ {price}{!reservation && (
                        <span className="text-indigo-800 font-normal">
                            / night
                        </span>
                    )}
                    </p>
                </div>
                {onAction && actionLabel && (
                    <Button
                    disabled={disabled}
                    small
                    label={actionLabel}
                    onClick={handleCancel}
                     />
                )}
            </div>
        </div>
    )
}