import React, { useState } from "react";
import { HiMenu, HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../images/favicon.png";
import '../App.css';

const NavbarItem = ({ title, classNameProps }) => {
    return <li className={`mx-4 cursor-pointer ${classNameProps}`}>{title}</li>;
};

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    return (
        <nav className="w-full flex md:justify-center justify-between items-center p-25">
            <div className="md:flex-[0.5] flex-initial justify-left items-center">
                <img src={logo} alt="logo" className="mt-6 mb-8 react-logo" />
            </div>
            <ul className="text-white md:flex py-1 px-8 mx-3 hidden flex-row justify-between item-center">
                {["NFTs", "Upgrade", "About"].map((item, index) => (
                    <NavbarItem key={item + index} title={item} />
                ))}
                <li className="bg-[#df7a1c] py-1 px-8 mx-3 rounded-full cursor-pointer hover:bg-[#e9751762]">
                    Login
                </li>
            </ul>
            <div className="flex relative text-serif">
                {toggleMenu ? (
                    <AiOutlineClose
                        fontSize={28}
                        className="text-white md:hidden cursor-pointer"
                        onClick={() => setToggleMenu(false)}
                    />
                ) : (
                    <HiMenuAlt4
                        fontSize={28}
                        className="text-white md:hidden cursor-pointer"
                        onClick={() => setToggleMenu(true)}
                    />
                )}
                {toggleMenu && (
                    <ul
                        className="z-30 fixed top-10 -right-1 p-8 w=[100vw] h-screen shadow-3xl 
                    md:hidden list-none flex-col justify-start items-end rounded-md bg-gradient-to-r from-indigo-300 ... 
                    text-white animate-slide-in backdrop-blur-md"
                    >
                        <li className="text-xl w-full my-1">
                            <AiOutlineClose className="cursor-pointer hover:bg-[#e9751762]" onClick={() => setToggleMenu(false)} />
                            {["NFTs", "Upgrade", "About"].map((item, index) => (
                                <NavbarItem
                                    key={item + index}
                                    title={item}
                                    classNameProps="my-3 text-lg"
                                />
                            ))}
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
// ⛔️ JSX expressions must have one parent element.
