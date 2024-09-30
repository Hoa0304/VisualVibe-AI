import { FaHome, FaShoppingBag, FaFileAlt, FaSignOutAlt } from 'react-icons/fa';

export const menuItems = [
    "Home",
    "Features",
    "Template",
    "Document",
    "Library"
];

export const sidebarItems = [
    { id: 0,name: "Home", link: "/home", icon: FaHome }, 
    { id: 1,name: "Product", link: "/product", icon: FaShoppingBag },
    { id: 2,name: "Detail", link: "/detail", icon: FaFileAlt },
    { id: 3,name: "Sign out", link: "/", icon: FaSignOutAlt }
];
