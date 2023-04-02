'use client'
//icons
import { AiOutlineMenu } from 'react-icons/ai';
import { useState, useCallback } from 'react';
//components
import Avatar from '../common/Avatar';
import MenuItem from './MenuItem';
//hooks
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
//types prisma
import { User } from '@prisma/client';
//signOut next-auth
import { signOut } from 'next-auth/react';

interface UserMenuProps {
    currentUser?: User | null;
}

export default function UserMenu ({currentUser}: UserMenuProps) {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isOpen, setIsOpen] = useState(false);


    const handleOpen = useCallback(() => {
        setIsOpen((value) => !value)
    }, [])

    const handleUserMenu = () => {
        console.log('User Menu')
    }

    return(
        <div
        className="relative"
        >
            <div
            className="flex items-center gap-x-2"
            >
                <button
                onClick={handleUserMenu}
                type="button"
                className='hidden md:block text-sm capitalize font-medium py-3 px-4 rounded-full hover:bg-neutral-100 transition duration-200 ease-in-out'
                >
                    Become a host
                </button>
                <button
                onClick={handleOpen}
                title="User Menu"
                type="button"
                className='p-4 md:py-1 md:px-2 border-2 border-neutral-200 flex items-center gap-3 rounded-full hover:shadow-md transition duration-200 ease-in-out'
                >
                    <AiOutlineMenu size={20} />
                    <div
                    className="hidden md:block"
                    >
                        <Avatar />
                    </div>
                </button>
            </div>
            {isOpen && (
                <div
                className='
                absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'
                >
                    <div className='flex flex-col'>
                        {currentUser ? (
                            <>
                                <MenuItem
                                handleClick={() => {}}
                                label='Become a host' 
                                />
                                <MenuItem
                                handleClick={() => {}}
                                label='My Trips' 
                                />
                                <MenuItem
                                handleClick={() => {}}
                                label='My Properties' 
                                />
                                <MenuItem
                                handleClick={() => {}}
                                label='My Favorites' 
                                />
                                <MenuItem
                                handleClick={() => {}}
                                label='My Reservations' 
                                />
                                <hr />
                                <MenuItem
                                handleClick={() => signOut()}
                                label='Logout'
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem
                                label='Login'
                                handleClick={() => loginModal.onOpen()}  
                                />
                                <MenuItem
                                label='Sign Up'
                                handleClick={() => registerModal.onOpen()}  
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}