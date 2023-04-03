'use client'

import { useCountries } from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "./Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import('../Map'), {ssr: false});

interface ListingInfoProps {
    host: SafeUser;
    category: {
        icon: IconType;
        label: string;
        description: string;
    } | undefined;
    description: string;
    roomCount: number;
    guestCount: number;
    bathroomCount: number;
    locationValue: string;
}

const ListingInfo = (
    {host, 
    category, 
    description, 
    roomCount, 
    guestCount, 
    bathroomCount, 
    locationValue
}: ListingInfoProps) => {
    const {getByValue} = useCountries();

    const coordinates = getByValue(locationValue)?.latlng;

    return (
        <article
        className="col-span-4 flex flex-col gap-8"
        >
            <div
            className="flex flex-col gap-2" 
            >
                <small className="text-medium text-extra-violet">
                    Hosted by {host.name}
                </small>
                               <ul
                className="flex gap-4 font-light text-gray-500"
                >
                    <li>
                        {guestCount} guests
                    </li>
                    <li>
                        {roomCount} bedrooms
                    </li>
                    <li>
                        {bathroomCount} bathrooms
                    </li>
                </ul>
            </div>
            <hr />
            {category && (
                <ListingCategory
                icon={category.icon}
                label={category.label}
                description={category.description}
                  />
            )}
            <hr />
            <p
            className="text-gray-500 font-light text-lg"
            >
                {description}
            </p>
            <hr />
            <Map center={coordinates} />
        </article>
    ) 
}

export default ListingInfo;