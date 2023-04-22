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
        className="underline text-extra-violet-500 hover:text-violet-500 visited:text-purple-500" 
        href={'https://github.com/Tati-Maria'}
        >
          Maria
          </Link>
        </p>
    </footer>
  )
}

export default Footer