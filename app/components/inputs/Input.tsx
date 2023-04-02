'use client'
import { BiDollar } from 'react-icons/bi'
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form'

export interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    multiline?: boolean;
}

const Input = ({
    id,
    label,
    type = 'text',
    disabled,
    formatPrice,
    required,
    register,
    errors,
}: InputProps) => {
  return (
    <div
    className='
    w-full
    relative
    '
    >
        {formatPrice && (
            <BiDollar 
            className='
            absolute 
            top-5 
            left-2 
            transform 
            text-neutral-500' 
             />
        )}
        <input
        id={id}
        disabled={disabled} 
        type={type}
        placeholder=' '
        {...register(id, { required })}
        className={`
        peer 
        w-full 
        p-4 
        font-light 
        bg-white 
        border-2 
        rounded-md 
        outline-none 
        transition 
        border-neutral-300 
        focus:border-black/90 
        ${errors[id] && 'border-red-500'} 
        ${disabled && 'bg-neutral-100'} 
        ${formatPrice ? 'pl-9' : 'pl-4'}`}
        />
        <label
        className={`
        absolute 
        top-5
        transform
        duration-150
        -translate-y-3
        z-10
        transition 
        origin-[0]
        ${disabled && 'text-neutral-300'}
        ${formatPrice ? 'left-9' : 'left-4'}
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-4
        text-sm
        ${errors[id] ? 'text-red-500': 'text-zinc-500'}
        `} 
        htmlFor={id}>
        {label}
        </label>
    </div>
  )
}

export default Input;
