'use client'

import { IconType } from "react-icons";

interface ListingInfoProps {
    icon: IconType;
    label: string;
    description: string;
}

const ListingCategory = ({icon: Icon, label, description}: ListingInfoProps) => {
    return (
        <div
        className="flex items-center gap-2"
        >
            <span
            className="text-2xl"
            >
                <Icon  size={35} className="text-gray-600"/>
            </span>
            <div className="flex flex-col">
                <h3 
                className="
                text-lg font-semibold text-gray-700
                ">
                    {label}
                </h3>
                <p
                className="text-gray-500"
                >
                    {description}
                </p>
            </div>
        </div>
    )
}

export default ListingCategory;