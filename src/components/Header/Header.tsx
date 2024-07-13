import Link from "next/link";
import { useState } from "react";
import { cx } from "@/utils/index";
import Logo from "./Logo"
import {
    DribbbleIcon,
    GithubIcon,
    LinkedinIcon,
    MoonIcon,
    SunIcon,
    TwitterIcon
} from "../Icons";

function Header() {
    return (
        <header className="min-h-[100px] w-full p-4  px-5 sm:px-10 flex items-center justify-between">
            <Logo />

            <nav
                className=" w-max py-3 px-8 border border-solid border-dark rounded-full font-medium capitalize  items-center sm:flex fixed top-6 right-1/2 translate-x-1/2 bg-light/80 backdrop-blur-sm z-50"
            >
                <Link href="/" className="mr-2">Home</Link>
                <Link href="/about" className="mx-2">About</Link>
                <Link href="/contact" className="mx-2">Contact</Link>
            </nav>

            <div className=" hidden sm:flex items-center">
                <a
                    href="#"
                    rel="noopener noreferrer"
                    className="inline-block w-6 h-6 mr-4"
                    aria-label="Reach out to me via LinkedIn"
                    target="_blank"
                >
                    <LinkedinIcon className="hover:scale-125 transition-all ease duration-200" />
                </a>
                <a
                    href="#"
                    rel="noopener noreferrer"
                    className="inline-block w-6 h-6 mr-4"
                    aria-label="Reach out to me via Twitter"
                    target="_blank"
                >
                    <TwitterIcon className="hover:scale-125 transition-all ease duration-200" />
                </a>
                <a
                    href="#"
                    rel="noopener noreferrer"
                    className="inline-block w-6 h-6 mr-4"
                    aria-label="Check my profile on Github"
                    target="_blank"
                >
                    <GithubIcon className="hover:scale-125 transition-all ease duration-200 dark:fill-light" />
                </a>
                <a
                    href="#"
                    rel="noopener noreferrer"
                    className="inline-block w-6 h-6 mr-4"
                    aria-label="Check my profile on Dribbble"
                    target="_blank"
                >
                    <DribbbleIcon className="hover:scale-125 transition-all ease duration-200" />
                </a>
            </div>
        </header>
    )
}

export default Header   