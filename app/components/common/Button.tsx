'use client'

import { IconType } from "react-icons";

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
}

const Button = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon,
}: ButtonProps) => {


    return (
        <button
        onClick={onClick}
        disabled={disabled}
        className={`
        relative
        disabled:opacity-50
        disabled:cursor-not-allowed
        rounded-md
        hover:opacity-80
        transition-opacity
        w-full
        ${outline ? "border border-gray-300" : "bg-extra-violet text-white"}
        ${outline ? "border border-black" : "border-extra-violet"}
        ${outline ? "text-black" : "text-white"}
        ${small ? "py-1 text-sm font-light border-[1px]" : "py-3 text-base font-semibold border-2"}
        `}
        >
            {Icon && <Icon size={24} className="absolute left-4 top-3" />}
            <span>{label}</span>
        </button>
    )
}

export default Button;