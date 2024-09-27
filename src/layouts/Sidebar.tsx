import React from 'react';
import avt from '../assets/icons/avt.jpg';
import { sidebarItems } from '../constants';
import { SidebarItem } from '../types/home.types';

const Sidebar: React.FC = () => {
    const renderSidebarItem = (item: SidebarItem, isActive: boolean) => (
        <li
            key={item.id} className={`py-1 flex w-44 items-center p-2 mb-4 cursor-pointer ${isActive
                    ? 'bg-gradient-to-r from-[#CD46D9] to-[#27C5C9] rounded'
                    : 'border duration-300 border-white hover:bg-gradient-to-r hover:from-[#CD46D9] hover:to-[#27C5C9] hover:rounded hover:opacity-95 hover:scale-90 hover:border-none'
                }`}
        >
            <span className="mr-5 bg-transparent">
                {React.createElement(item.icon, { className: "bg-transparent" })}
            </span>
            <a className="bg-transparent" href={item.link}>
                {item.name}
            </a>
        </li>
    );

    return (
        <nav className="w-64 text-primary font-inter font-light text-lg p-4">
            <figure className="flex items-center mb-10">
                <div className="relative w-11 h-11 rounded-full bg-gradient-to-r from-[#CD46D9] to-[#27C5C9] flex justify-center items-center">
                    <img src={avt} alt="Avatar" className="rounded-full w-10 h-10" />
                </div>
                <figcaption className="ml-2">Cam Hoa</figcaption>
            </figure>
            <nav>
                <ul>
                    {renderSidebarItem(sidebarItems[0], true)}
                    {sidebarItems.slice(1).map((item: SidebarItem) => (
                        renderSidebarItem(item, false)
                    ))}
                </ul>
            </nav>
        </nav>
    );
};

export default Sidebar;
