'use client'
import { IconType } from "react-icons"

/*col-span-1 
            text-left 
            hover:bg-extra-violet/20 
            p-2 
            w-max 
            rounded-md */
interface CategoryInputProps {
    icon: IconType;
    label: string;
    selected: boolean;
    onClick: (value: string) => void;
}

const CategoryInput = ({icon: Icon, label, selected, onClick}: CategoryInputProps) => {
  return (
    <button
    onClick={() => onClick(label)}
    className={`
    col-span-1
    text-sm 
    text-left 
    border
    border-extra-violet/20
    p-2 
    rounded-md
    hover:bg-extra-violet/20
    transition-colors
    duration-200
    ${selected ? 'bg-extra-violet/20' : ''}
    `}
    >   
        <Icon size={30} className="mb-3" />
        <span className="font-medium">{label}</span>
    </button>
  )
}

export default CategoryInput