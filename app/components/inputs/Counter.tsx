'use client'
import { useCallback } from "react";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai"
import {toast} from "react-hot-toast"

interface CounterProps {
    title: string;
    subtitle: string;
    value: number;
    onChange: (value: number) => void;
}

export default function Counter({title, subtitle, value, onChange}: CounterProps) {
    const onAdd = useCallback(() => {
        onChange(value + 1);
    }, [value, onChange ]);

    const onSubtract = useCallback(() => {
        if(value === 1){
            toast.error("You can't have less than 1 guest");
            return;
        };
        onChange(value - 1);
    }, [value, onChange]);

    return(
        <div className="flex items-center justify-between border-b py-4">
            <article className="flex flex-col">
                <h3 className="text-lg font-medium">{title}</h3>
                <small className="font-light text-gray-600">
                    {subtitle}
                </small>
            </article>
            <div className="flex items-center gap-2">
                <button
                className="border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center hover:border-gray-600 duration-300"
                onClick={onSubtract} 
                >
                   <AiOutlineMinus className="text-gray-600" size={20} />
                </button>
                <span className="font-medium">{value}</span>
                <button
                className="border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center hover:border-gray-600 duration-300"
                onClick={onAdd} 
                >
                   <AiOutlinePlus className="text-gray-600" size={20} />
                </button>
            </div>
        </div>
    )
}