import React from 'react'
import { useDispatch } from "react-redux"
import { toggleDarkMode } from "../store/slice/themeSlice"
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";


function Header({ setMenuOpen, menuOpen }) {
    const dispatch = useDispatch()

    return (
        <header className="sticky top-0 left-0 w-full bg-white shadow z-50">
            <div className="flex items-center justify-between md:px-20 px-5 py-4">
                <div className="text-xl font-bold">IoT NoticeBoard</div>
                <button
                    className="md:hidden text-gray-700"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <nav className="hidden md:flex gap-6 text-sm">
                    <a href="#features" className="hover:text-blue-600">Features</a>
                    <a href="#how" className="hover:text-blue-600">How It Works</a>
                    <a href="#usecases" className="hover:text-blue-600">Use Cases</a>
                    <a href="#contact" className="hover:text-blue-600">Contact</a>
                    <Link to={"/new"} className="hover:text-blue-600">admin</Link>
                    <div className="ml-20">
                        <Link to={"auth/login"} className=" font-bold text-sm"> Login
                        </Link>&nbsp;
                        |
                        <Link to={"auth/register"} className="font-bold text-sm"> Register
                        </Link>

                    </div>
                </nav>
            </div>

            {/* Slide-in Mobile Menu */}
            <div
                className={`md:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex flex-col p-6 gap-4">
                    <a href="#features" className="hover:text-blue-600" onClick={() => setMenuOpen(false)}>Features</a>
                    <a href="#how" className="hover:text-blue-600" onClick={() => setMenuOpen(false)}>How It Works</a>
                    <a href="#usecases" className="hover:text-blue-600" onClick={() => setMenuOpen(false)}>Use Cases</a>
                    <a href="#contact" className="hover:text-blue-600" onClick={() => setMenuOpen(false)}>Contact</a>
                    <Link to={"/new"} className="hover:text-blue-600">admin</Link>

                    <div className="flex flex-col items-start justify-start  w-full">
                        <Link to={"auth/login"} className=" font-bold text-sm"> Login
                        </Link>&nbsp;

                        <Link to={"auth/register"} className="font-bold text-sm"> Register
                        </Link>

                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header