'use client'
import { useCallback } from 'react'
import { IconType } from 'react-icons'
import { useRouter, useSearchParams } from 'next/navigation'
import query from "query-string";

interface CategoryBoxProps {
    label: string
    icon: IconType
    description?: string
    selected?: boolean
}

const CategoryBox = ({label, icon: Icon, selected}: CategoryBoxProps) => {
    const router = useRouter();
    const params = useSearchParams();

    const handleCategoryClick = useCallback(() => {
        let currentQuery = {};
        // if there are params, parse them into an object
        if(params) {
            currentQuery = query.parse(params.toString());
        }
        // update the query object with the new category
        const updatedQuery: any = {
            ...currentQuery,
            category: label
        }
        // if the category is already selected, remove it from the query
        if(params?.get('category') === label) {
            delete updatedQuery.category;
        }

        // stringify the query object and push it to the router
        const url = query.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, {skipNull: true, skipEmptyString: true});
        router.push(url);

    }, [label, params, router]);

  return (
    <li
    aria-label='Category'
    aria-details='Category'
    tabIndex={0}
    onClick={handleCategoryClick}
    className={`
    flex
    flex-col
    items-center
    justify-center
    gap-2
    p-3
    border-b-2
    hover:text-neutral-800
    transition
    duration-200
    cursor-pointer
    ${selected ? 'border-neutral-800 text-neutral-800' : 'border-transparent text-neutral-500'}
    `}
    >
        <Icon
        className='text-2xl'
        />
        <span
        className='text-xs font-semibold'
        >
            {label}
        </span>
    </li>
  )
}

export default CategoryBox