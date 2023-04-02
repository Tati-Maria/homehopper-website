'use client'
import Image from "next/image";
import {useRouter} from "next/navigation"

export default function Logo () {
    const router = useRouter()
    return (
        <div>
            <Image
            onClick={() => router.push('/')} 
            src='/llogo.png' 
            alt="HomeHopper Logo" 
            width={110} 
            height={50}
            className="hidden md:block cursor-pointer h-auto w-auto"
            priority 
            />
        </div>
    )
}