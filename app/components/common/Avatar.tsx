'use client'
import Image from "next/image"

const Avatar = () => {
    return (
        <Image
        className="rounded-full ring-1 w-full h-full ring-gray-200" 
        alt="image" 
        src='/60.jpg'
        width={40}
        height={40}
        />
    )
}

export default Avatar;