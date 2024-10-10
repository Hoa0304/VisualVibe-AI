import React from 'react';
import InputField from '../common/InputField';
import { FiSearch } from 'react-icons/fi';
import search from '../../assets/images/bg.png';
import star from '../../assets/icons/starBoldBig.svg';
import girl from '../../assets/icons/girl.svg';

const SearchSection: React.FC = () => (
    <section className="lg:mb-20 w-full relative lg:h-1/2 flex items-center rounded-2xl">
        <figure className="absolute w-full h-full left-0 right-0 top-0 z-10 opacity-70 rounded-3xl hidden lg:flex flex-shrink">
            <img src={search} alt="Placeholder" className="w-full h-full object-cover rounded-2xl" />
        </figure>
        <figure className="absolute top-8 right-[14rem] z-10 bg-transparent">
            <img src={girl} alt="girl" className="bg-transparent w-[100%]" />
        </figure>
        <figure className="absolute -top-10 -right-[4rem] z-0">
            <img src={star} alt="star" className="bg-transparent w-[80%]" />
        </figure>
        <figure className="absolute -bottom-10 -left-10 z-0">
            <img src={star} alt="star" className="bg-transparent w-[80%]" />
        </figure>
        <InputField
            type="text"
            placeholder="Search"
            id="search"
            icon={<FiSearch />}
            classNamePrefix="lg:w-[25%] md:w-[40%] bg-transparent md:ml-0 lg:ml-20 z-20"
        />
    </section>
);

export default SearchSection;
