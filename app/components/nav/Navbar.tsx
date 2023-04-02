'use client'
import Logo from "../common/Logo";
import Container from "../layouts/Container";
import FlexLayout from "../layouts/FlexLayout";
import Search from "./Search";
import UserMenu from "./UserMenu";
import {User} from "@prisma/client"

interface NavbarProps {
    currentUser?: User | null;
}

export default function Navbar({currentUser}: NavbarProps) {
    return(
        <header
        className='fixed w-full bg-white z-10 shadow-sm'
        >
            <nav
            className='py-4 border-b-[1px] border-gray-200'
            >
                <Container>
                    <FlexLayout>
                        <Logo />
                        <Search />
                        <UserMenu currentUser={currentUser} />
                    </FlexLayout>
                </Container>
            </nav>
        </header>
            
    )
}