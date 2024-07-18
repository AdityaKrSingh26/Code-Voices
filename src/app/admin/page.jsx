"use client";
import React, { useState } from 'react'
import Link from 'next/link'
import axios from 'axios';
import BlogListPage from '@/components/Blog/BlogList';
import AddBlogPage from '@/components/Blog/AddBlog';
import SubscribedEmails from '@/components/Blog/SubscriptionsList';

function AdminPage() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [password, setPassword] = useState("");

    const [showSub, setShowSubs] = useState(false);
    const [showAddBlog, setShowAddBlog] = useState(false);
    const [showALlBlogs, setShowAllBlogs] = useState(true);

    const verifyPassword = async () => {
        console.log("33");
        try {
            const res = await axios.post('/api/admin', { password });
            console.log(res);
            if (res.data.success) {
                setIsAdmin(true);
            }
            else {
                alert("Incorrect Password");
            }
        } catch (error) {
            console.log(error);
            alert("Error verifying password");
        }
    }

    function showSubsClick() {
        setShowSubs(true);
        setShowAddBlog(false);
        setShowAllBlogs(false);
    }
    function showAddBlogsClick() {
        setShowSubs(false);
        setShowAddBlog(true);
        setShowAllBlogs(false);
    }
    function showAllBlogsClick() {
        setShowSubs(false);
        setShowAddBlog(false);
        setShowAllBlogs(true);
    }

    if (!isAdmin) {
        return (
            <div className='w-full h-full dark:text-white flex flex-col justify-center items-center'>
                <h1 className='text-center font-bold text-4xl mt-10'>
                    You are not authorized to view this page
                </h1>
                <h3 className='text-center font-bold text-2xl mt-10'>
                    Enter Password
                </h3>
                <div className="form-group mt-5 mb-4">
                    <input
                        type="password"
                        className="max-w-[300px] form-control mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-zinc-800   dark:text-gray-400"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                </div>
                <button
                    className="inline-block bg-blue-500 text-white py-2 px-10 rounded hover:bg-blue-700"
                    onClick={verifyPassword}
                >
                    Enter
                </button>
            </div>
        )
    }

    return (
        <div className='w-full h-full dark:text-white'>
            <h1 className='text-center font-bold text-5xl'>
                Welcome Admin
            </h1>
            <div className="text-center mt-10">
                <button
                    className="inline-block m-10 bg-blue-500 text-white py-2 px-10 rounded hover:bg-blue-700"
                    onClick={showAddBlogsClick}
                >
                    Add Blog
                </button>

                <button
                    className="inline-block m-10 bg-blue-500 text-white py-2 px-10 rounded hover:bg-blue-700"
                    onClick={showAllBlogsClick}
                >
                    Show All Blogs
                </button>

                <button
                    className="inline-block m-10 bg-blue-500 text-white py-2 px-10 rounded hover:bg-blue-700"
                    onClick={showSubsClick}
                >
                    View Subscribed Emails
                </button>

            </div>

            {showALlBlogs && <BlogListPage />}
            {showAddBlog && <AddBlogPage />}
            {showSub && <SubscribedEmails />}
        </div>
    )
}

export default AdminPage
