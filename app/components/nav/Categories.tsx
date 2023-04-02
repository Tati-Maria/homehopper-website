'use client'
import Container from "../layouts/Container"
import CategoryBox from "../common/CategoryBox";
import {IoDiamond} from 'react-icons/io5';
import {MdBeachAccess, MdVilla, MdPool} from 'react-icons/md';
import {BsSnow} from 'react-icons/bs';
import {GiBarn, GiBoatFishing, GiCastle, GiCaveEntrance, GiDesert, GiForestCamp, GiIsland} from 'react-icons/gi';
import {TbMountain} from 'react-icons/tb';
import {FaSkiing, FaWind} from 'react-icons/fa';
import {useSearchParams, usePathname} from "next/navigation"


export const categories = [
    {
        label: 'Beach',
        icon: MdBeachAccess, 
        description: 'Property near the beach',
    },
    {
        label: 'Windmills',
        icon: FaWind, 
        description: 'This property has windmills',
    },
    {
        label: 'Modern',
        icon: MdVilla, 
        description: 'This property is modern',
    },
    {
        label: 'Countryside',
        icon: TbMountain, 
        description: 'This property is in the countryside',
    },
    {
        label: 'Pools',
        icon: MdPool, 
        description: 'This property has a pool',
    },
    {
        label: 'Islands',
        icon: GiIsland, 
        description: 'This property is on an island',
    },
    {
        label: 'Lake',
        icon: GiBoatFishing, 
        description: 'This property is close to lake',
    },
    {
        label: 'Skiing',
        icon: FaSkiing, 
        description: 'This property has skiing nearby',
    },
    {
        label: 'Castles',
        icon: GiCastle, 
        description: 'This property has castles nearby',
    },
    {
        label: 'Camping',
        icon: GiForestCamp, 
        description: 'This property has camping nearby',
    },
    {
        label: 'Artic',
        icon: BsSnow, 
        description: 'Snowy property',
    },
    {
        label: 'Cave',
        icon: GiCaveEntrance, 
        description: 'This property has caves nearby',
    },
    {
        label: 'Desert',
        icon: GiDesert, 
        description: 'This property is in the desert',
    },
    {
        label: 'Barns',
        icon: GiBarn, 
        description: 'This property has barns nearby',
    },
    {
        label: 'Luxury',
        icon: IoDiamond, 
        description: 'Luxury property',
    },
]

const Categories = () => {
    const params = useSearchParams();
    const selectedCategory = params?.get('category');
    //hide the categories if there is a selected category
    const pathname = usePathname();

    const isMainPage = pathname === '/';
    if(!isMainPage) return null;





  return (
    <Container>
        <section
        className="
        pt-4
        flex
        items-center
        justify-between
        overflow-x-auto
        "
        >
            {categories.map((category, index) => (
                <CategoryBox
                key={index}
                label={category.label}
                icon={category.icon}
                selected={selectedCategory === category.label}
                />
            ))}
        </section>
    </Container>
  )
}

export default Categories