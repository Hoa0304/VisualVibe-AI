import React from 'react';
import avt from '../assets/icons/avt.jpg';
import { sidebarItems } from '../constants';
import { SidebarItem as SidebarItemType } from '../types/home.types';
import SidebarItem from '../components/SidebarItem';
import { useSidebarController } from '../controllers/authController';

const Sidebar: React.FC = () => {
    const { handleSignOut } = useSidebarController();

    return (
        <nav className="w-64 text-primary font-inter font-light text-lg p-4 z-0">
            <figure className="flex items-center mb-10">
                <div className="relative w-11 h-11 rounded-full bg-gradient-to-r from-[#CD46D9] to-[#27C5C9] flex justify-center items-center">
                    <img src={avt} alt="Avatar" className="rounded-full w-10 h-10" />
                </div>
                <figcaption className="ml-2">Cam Hoa</figcaption>
            </figure>
            <nav>
                <ul>
                    <SidebarItem item={sidebarItems[0]} isActive={true} onSignOut={handleSignOut} />
                    {sidebarItems.slice(1).map((item: SidebarItemType) => (
                        <SidebarItem key={item.id} item={item} isActive={false} onSignOut={handleSignOut} />
                    ))}
                </ul>
            </nav>
        </nav>
    );
};

export default Sidebar;
