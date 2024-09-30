import Button from "../components/Button";
import { menuItems } from "../constants";

const Header: React.FC = () => {
    return (
        <header className="flex md:justify-between items-start h-35 p-4 text-primary mt-5">

            <h1 className="w-80 self-center text-6xl font-italianno bg-clip-text text-transparent bg-gradient-to-r from-[#CD46D9] to-[#27C5C9] inline-block min-w-fit">
                VisualVibeAI
            </h1>
            <nav className="hidden lg:flex font-inter font-light self-center w-[60%]">
                <ul className="flex">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <a href="#" className="mx-5 transition-all duration-200 hover:bg-clip-text hover:text-secondary">{item}</a>
                        </li>
                    ))}
                </ul>
            </nav>

            <Button className="bg-gradient-to-r from-[#CD46D9] to-[#27C5C9] px-4 py-2 font-normal font-inter rounded-custom transform -translate-y-3 whitespace-nowrap">
                Create a Product
            </Button>
        </header>
    );
}

export default Header;
