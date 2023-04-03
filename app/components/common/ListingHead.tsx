'use client'

import { useCountries } from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from "./Heading";
import Image from "next/image";
import HeartButton from "./HeartButton";

interface ListingHeadProps {
  id: string;
  title: string;
  imageSrc: string;
  locationValue: string;
  currentUser?: SafeUser | null;
}

const ListingHead = ({id, title, imageSrc, locationValue, currentUser}: ListingHeadProps) => {
  const {getByValue} = useCountries();
  const location = getByValue(locationValue);
  return (
    <>
      <Heading
      title={title}
      subText={`${location?.label} | ${location?.region}`} 
      />
      <figure
      className='w-full h-[60vh] overflow-hidden rounded-xl relative'
      >
        <Image
        src={imageSrc}
        fill
        alt="Listing Image"
        priority
        className="object-cover"
         />
         <div className="absolute top-5 right-5">
            <HeartButton
            listingId={id}
            currentUser={currentUser} 
            />
         </div>
      </figure>
    </>
  )
}

export default ListingHead;