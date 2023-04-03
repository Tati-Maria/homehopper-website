'use client'

import {Range} from 'react-date-range';
import Calendar from '../inputs/Calendar';
import Button from './Button';

interface ListingReservationProps {
    price: number;
    dateRange: Range;
    totalPrice: number;
    onDateChange: (value: Range) => void;
    onSubmit: () => void;
    disabledDates: Date[];
    disabled?: boolean;
}

const ListingReservation = (
    {price,
     dateRange, 
     disabledDates,
    onDateChange,
     disabled, 
     onSubmit, 
     totalPrice}: ListingReservationProps) => {
  return (
    <div
    className='bg-white rounded-xl border-[1px] border-gray-200 overflow-hidden'
    >
        <div
        className='flex items-center gap-1 p-4' 
        >
            <small>
                <strong>${price}</strong> / night
            </small>
        </div>
        <hr />
        <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onDateChange(value.selection)}
         />
         <hr />
         <div className="p-4">
            <Button
            label='Reserve'
            onClick={onSubmit} 
            />
         </div>
         <div
         className='flex p-4 items-center justify-between font-semibold'
         >
                <span>Total</span>
                <span>${totalPrice}</span>
         </div>
    </div>
  )
}

export default ListingReservation