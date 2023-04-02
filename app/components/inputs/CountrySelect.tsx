'use client'
import Select from 'react-select';
import { useCountries } from '@/app/hooks/useCountries';

export type CountrySelectValue = {
    flag: string;
    label: string;
    latlng: number[];
    region: string;
    value: string;
}

interface CountrySelectProps {
    value?: CountrySelectValue | null;
    onChange: (value: CountrySelectValue | null) => void;
}

const CountrySelect = ({value, onChange}: CountrySelectProps) => {
    const { getAll } = useCountries();
  return (
    <div>
        <Select
        placeholder="Select a country"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option) => (
            <div className='flex items-center gap-3'>
                <div>
                    {option.flag}
                </div>
                <p>
                    {option.label}, <span className='text-neutral-500 ml-1 text-sm'>{option.region}</span>
                </p>
            </div>
        )}
        theme={(theme) => ({
            ...theme,
            borderRadius: 6,
            colors: {
                ...theme.colors,
                primary25: 'rgba(164, 33, 240, 0.14)',
                primary: 'rgba(117, 29, 184, 0.1)',
            },
        })}
         />
    </div>
  )
}

export default CountrySelect