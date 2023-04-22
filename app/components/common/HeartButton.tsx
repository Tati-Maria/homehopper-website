'use client'
import useFavorite from "@/app/hooks/useFavortite";
import { SafeUser } from "@/app/types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
    listingId: string;
    currentUser?: SafeUser | null;
}

const HeartButton = ({listingId, currentUser}: HeartButtonProps) => {
    const {hasFavorited, toggleFavorite} = useFavorite({
        listingId,
        currentUser
    })
  return (
    <button
    onClick={toggleFavorite}
    className='relative hover:opacity-80 transition-opacity duration-200 focus:outline-none focus:ring-black focus:ring-2 focus:ring-opacity-50'
    >
        <AiOutlineHeart
        size={28}
        className='fill-white absolute -top-[2px] -right-[2px]'
         />
         <AiFillHeart
            size={24}
            className={`
            ${hasFavorited ? 'fill-red-500' : 'fill-neutral-500/70'}
            `} 
         />
    </button>
  )
}

export default HeartButton;