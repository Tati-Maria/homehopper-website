'use client'
import { IconType } from "react-icons";
import Spinner from "./Spinner";

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
    loading?: boolean;
    blue?: boolean;
}

const Button = ({
    label,
    loading,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon,
    blue
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
        ${blue && "bg-blue-500 text-white"}
        ${outline ? "border border-gray-300" : "bg-extra-violet text-white"}
        ${outline ? "border border-black" : "border-extra-violet"}
        ${outline ? "text-black" : "text-white"}
        ${small ? "py-1 text-sm font-light border-[1px]" : "py-3 text-base font-semibold border-2"}
        `}
        >
            {Icon && <Icon size={24} className="absolute left-4 top-3" />}
            {loading ? <Spinner /> : (<span>{label}</span>)}
        </button>
    )
}

export default Button;