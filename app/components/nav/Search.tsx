'use client'
import { BiSearch } from 'react-icons/bi'

const Search = () => {
  return (
    <div
    className='border-[1px] w-full md:w-auto py-2 px-4 border-gray-200 rounded-full hover:shadow-md transition duration-200 ease-in-out cursor-pointer'
    >
        <div
        className='flex items-center justify-between'
        >
            <div
            className='text-sm text-gray-500 px-2'
            >
                Anywhere
            </div>
            <div
            className='
            hidden
            sm:block
            text-sm
            font-semibold
            px-6
            border-x-[1px]
            flex-1
            text-center
            '
            >
                Any Week
            </div>
            <div
            className='
            text-sm
            pl-6
            pr-2
            text-gray-600
            flex
            items-center
            gap-3
            '
            >
                <div
                className="hidden sm:block"
                >
                    Add Guests
                </div>
                <div
                className='
                p-2
                rounded-full
                bg-rose-500
                text-white
                '
                >
                    <BiSearch size={18} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Search;