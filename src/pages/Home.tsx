import React from 'react';
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import search from '../assets/images/bg.png';
import star from '../assets/icons/starBoldBig.svg';
import { FiSearch } from 'react-icons/fi';
import InputField from '../components/InputField';

const Home: React.FC = () => {

  
  return (
    <div className="flex flex-col h-screen ml-20 mr-20">
      <Header />
      <div className="flex flex-1 mt-3">
        <Sidebar/>
        {/* Main Content */}
        <main className="flex-1 p-4">
          <section className="mb-20 w-full relative h-1/2 flex items-center rounded-2xl">
            <figure className="absolute w-full h-full left-0 right-0 top-0 z-10 opacity-70">
              <img
                src={search}
                alt="Placeholder"
                className="w-full h-full object-cover"
              />
            </figure>
            <figure className="absolute -top-10 -right-[4rem] z-0"><img src={star} alt="" className="bg-transparent w-[80%]" /></figure>
            <figure className="absolute -bottom-10 -left-10 z-0"><img src={star} alt="" className="bg-transparent w-[80%]" /></figure>
            <InputField 
            type="text"
            placeholder="Search"
            id="search"
            icon={<FiSearch />}
            classNamePrefix="w-[25%] bg-transparent ml-20 z-20"
            />
            
          </section>
          <div className="grid grid-cols-3 gap-4">
            {/* Placeholder for images/cards */}
            <div className="bg-gray-300 p-4 rounded">Image 1</div>
            <div className="bg-gray-300 p-4 rounded">Image 2</div>
            <div className="bg-gray-300 p-4 rounded">Image 3</div>
            <div className="bg-gray-300 p-4 rounded">Image 4</div>
            <div className="bg-gray-300 p-4 rounded">Image 5</div>
            <div className="bg-gray-300 p-4 rounded">Image 6</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
