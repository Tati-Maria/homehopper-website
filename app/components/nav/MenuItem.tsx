'use client'

interface MenuItemProps {
    handleClick: () => void
    label: string
}



export default function MenuItem ({label, handleClick}: MenuItemProps) {

    return (
        <button
        onClick={handleClick}
        className="inline-block text-left px-4 py-3 hover:bg-neutral-100 transition font-medium duration-200 ease-in-out"
        >
            {label}
        </button>
    )
}