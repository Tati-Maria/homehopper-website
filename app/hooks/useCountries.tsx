import countries from "world-countries";

const formatCountries = countries.map((country) => ({
    label: country.name.common,
    value: country.cca2,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region,
}))

export const useCountries = () => {
    const getAll = () => formatCountries;

    const getByValue = (value: string) => {
        return formatCountries.find((country) => country.value === value);
    }

    return {
        getAll,
        getByValue,
    }
}