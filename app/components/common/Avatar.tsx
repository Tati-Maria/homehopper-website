'use client'
import Image from "next/image"

interface AvatarProps {
    src?: string | null | undefined;
}

const Avatar = ({src}: AvatarProps) => {
    return (
        <Image
        className="rounded-full ring-1 w-full h-full ring-gray-300" 
        alt="image" 
        src={src || "/placeholder.jpg"}
        width={30}
        height={30}
        priority
        />
    )
}

export default Avatar;