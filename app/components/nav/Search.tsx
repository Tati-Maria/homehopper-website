'use client'
import { useCountries } from '@/app/hooks/useCountries';
import useSearchModal from '@/app/hooks/useSearchModal'
import { useSearchParams } from 'next/navigation';
import { BiSearch } from 'react-icons/bi';
import { useMemo } from 'react';
import { differenceInDays } from 'date-fns';

const Search = () => {
    const searchModal = useSearchModal();
    const params = useSearchParams();
    const {getByValue} = useCountries();

    const locationValue = params?.get('locationValue');
    const startDate = params?.get('startDate');
    const endDate = params?.get('endDate');
    const guestCount = params?.get('guestCount');

    const locationLabel = useMemo(() => {
        if(locationValue) {
            return getByValue(locationValue as string)?.label;
        }
        return 'Anywhere';
    }, [locationValue, getByValue]);

    const durationLabel = useMemo(() => {
        if(startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            let diff = differenceInDays(end, start);

            //if the dates are the same, it will return 0
            if(diff === 0) {
                diff = 1;
            }

            return `${diff} ${diff > 1 ? 'nights' : 'night'}`;
        }
        return 'Any Week';
    }, [startDate, endDate]);

    const guestLabel = useMemo(() => {
        if(guestCount) {
            return `${guestCount} ${+guestCount > 1 ? 'guests' : 'guest'}`;
        }
        return 'Add Guests';
    }, [guestCount]);

  return (
    <div
    onClick={searchModal.onOpen}
    className='border-[1px] w-full md:w-auto py-2 px-4 border-gray-200 rounded-full hover:shadow-md transition duration-200 ease-in-out cursor-pointer'
    >
        <div
        className='flex items-center justify-between'
        >
            <div
            className='text-sm text-gray-500 px-6'
            >
                {locationLabel}
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
                {durationLabel}
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
                    {guestLabel}
                </div>
                <div
                className='
                p-2
                rounded-full
                bg-extra-violet
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