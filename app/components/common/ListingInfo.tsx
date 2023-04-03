'use client'

import { useCountries } from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import  {BsPeopleFill} from "react-icons/bs";
import {BiBed, BiShower} from "react-icons/bi";
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
                    <li className="flex items-center">
                        <BsPeopleFill className="inline-block mr-1" />
                        {guestCount} guests
                    </li>
                    <li className="flex items-center">
                        <BiBed className="inline-block mr-1" />
                        {roomCount} bedrooms
                    </li>
                    <li className="flex-items-center">
                        <BiShower className="inline-block mr-1" />
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