"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BlogListPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('/api/blog');
                setBlogs(response.data.allBlog);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/api/blog?id=${id}`);
            setBlogs(blogs.filter((blog: any) => blog._id !== id));
        } catch (error) {
            console.error('Failed to delete blog:', error);
        }
    };

    if (loading) {
        return <div className='text-center'>Loading...</div>;
    }

    return (
        <div className="w-full h-full dark:text-white flex justify-center items-center mt-8">
            <div className="max-w-lg w-full">
                <h1 className="text-center font-bold text-3xl mb-3">
                    Blog List
                </h1>

                <div className="text-xl">
                    <table className="min-w-full dark:bg-transparent bg-white dark:bg-gray-800 shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-700">
                                <th className="px-6 py-3 text-left font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Published At
                                </th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-transparent dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {blogs.map((blog: any) => (
                                <tr key={blog._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {blog.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {new Date(blog.publishedAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {/* <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-600">
                                            Edit
                                        </button> */}
                                        <button
                                            onClick={() => handleDelete(blog._id)}
                                            className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BlogListPage;
