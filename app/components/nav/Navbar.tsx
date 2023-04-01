'use client'
import Logo from "../common/Logo";
import Container from "../layouts/Container";
import FlexLayout from "../layouts/FlexLayout";
import Search from "./Search";
import UserMenu from "./UserMenu";

export default function Navbar() {
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
                        <UserMenu />
                    </FlexLayout>
                </Container>
            </nav>
        </header>
            
    )
}