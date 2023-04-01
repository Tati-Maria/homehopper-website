import Link from "next/link"

const Footer = () => {
  return (
    <footer
    className="flex flex-col items-center justify-center w-full h-24 border-t"
    >
        <p
        className="text-sm"
        >© 2023 - HomeHopper All rights reserved</p>
        <p
        className="text-sm"
        >
          Created by{' '} 
        <Link
        className="text-rose-500 underline" 
        href={'https://github.com/Tati-Maria'}
        >
          Maria
          </Link>
        </p>
    </footer>
  )
}

export default Footer