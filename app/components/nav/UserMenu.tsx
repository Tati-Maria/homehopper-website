'use client'
import { AiOutlineMenu } from 'react-icons/ai';
import { useState, useCallback } from 'react';
import Avatar from '../common/Avatar';
import MenuItem from './MenuItem';

export default function UserMenu () {
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
                        <>
                            <MenuItem
                            label='Login'
                            handleClick={() => console.log('Login')}  
                            />
                            <MenuItem
                            label='Sign Up'
                            handleClick={() => console.log('Sign Up')}  
                            />
                        </>
                    </div>
                </div>
            )}
        </div>
    )
}