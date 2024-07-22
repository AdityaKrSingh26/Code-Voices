"use client";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { DribbbleIcon, GithubIcon, LinkedinIcon, TwitterIcon } from "../Icons";
import Link from "next/link";
import siteMetadata from "@/utils/siteMetaData";

const Footer = () => {

    const [email, setEmail] = React.useState("");

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const formData = new FormData();
            formData.append('email', email);

            const response = await axios.post('/api/email', formData);

            if (response.data.success) {
                alert('Email added successfully!');
                setEmail('');
            } else {
                setEmail('');
                alert('Failed to add email!');
            }
            console.log(response.data);
        } catch (error) {
            setEmail('');
            alert('Failed to add email!');
            console.error('Error:', error);
        }
    };

    // console.log(errors);

    return (
        <footer className="mt-16 rounded-2xl bg-dark dark:bg-accentDark/90 m-2 sm:m-10 flex flex-col items-center text-light dark:text-dark">
            <h3 className="mt-16 font-medium dark:font-bold text-center capitalize text-2xl sm:text-3xl lg:text-4xl px-4">
                Interesting Stories | Updates | Guides
            </h3>
            <p className="mt-5 px-4 text-center w-full sm:w-3/5 font-light dark:font-medium text-sm sm:text-base">
                Subscribe to learn about new technology and updates. Join over 5000+
                members community to stay up to date with latest news.
            </p>

            <form
                onSubmit={onSubmit}
                className="mt-6 w-fit sm:min-w-[384px] flex items-stretch bg-light dark:bg-dark p-1 sm:p-2 rounded mx04"
            >
                <input
                    type="email"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent pl-2 sm:pl-0 text-dark dark:text-white focus:border-dark focus:ring-0 border-0 border-b mr-2 pb-1"
                />

                <button
                    type="submit"
                    className="bg-dark text-light dark:text-dark dark:bg-light cursor-pointer font-medium rounded px-3 sm:px-5 py-1"
                >
                    Submit
                </button>
            </form>
            <div className="flex items-center mt-8 mb-8">
                <a
                    href={siteMetadata.linkedin}
                    className="inline-block w-6 h-6 mr-4"
                    aria-label="Reach out to me via LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <LinkedinIcon className="hover:scale-125 transition-all ease duration-200" />
                </a>
                <a
                    href={siteMetadata.twitter}
                    className="inline-block w-6 h-6 mr-4"
                    aria-label="Reach out to me via Twitter"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <TwitterIcon className="hover:scale-125 transition-all ease duration-200" />
                </a>
                <a
                    href={siteMetadata.github}
                    className="inline-block w-6 h-6 mr-4 fill-light"
                    aria-label="Check my profile on Github"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <GithubIcon className="fill-light dark:fill-dark  hover:scale-125 transition-all ease duration-200" />
                </a>
                <a
                    href={siteMetadata.dribbble}
                    className="inline-block w-6 h-6 mr-4"
                    aria-label="Check my profile on Dribbble"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <DribbbleIcon className="hover:scale-125 transition-all ease duration-200" />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
