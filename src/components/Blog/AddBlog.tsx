"use client"
import React, { useState } from 'react';
import axios from 'axios';

const AddBlogPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [url, setUrl] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [publishedAt, setPublishedAt] = useState('');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('tags', tags);
        formData.append('image', image as Blob);

        const respone = await axios.post('/api/blog', formData);
        if (respone.data.success) {
            alert('Blog created successfully!');
            setTitle('');
            setDescription('');
            setTags('');
            setImage(null);
        } else {
            alert('Failed to create blog!');
        }
        console.log(respone.data);

        console.log({
            title,
            description,
            tags,
            url,
            image,
            publishedAt,
        });
    };

    return (
        <div className="w-full h-full dark:text-white flex justify-center items-center">
            <div className="max-w-lg w-full">
                <h1 className="text-center font-bold text-5xl mb-8">Add Blog</h1>
                <form
                    onSubmit={handleSubmit}
                    className="bg-white dark:bg-transparent p-6 rounded-lg shadow-lg"
                >
                    <div className="form-group mb-4">
                        <label
                            htmlFor="title"
                            className="block text-xl font-semibold text-gray-700 dark:text-gray-300"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            className="form-control mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-zinc-800   dark:text-gray-400"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label
                            htmlFor="description"
                            className="block text-xl font-semibold text-gray-700 dark:text-gray-300"
                        >
                            Description
                        </label>
                        <textarea
                            className="form-control mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-zinc-800   dark:text-gray-400"
                            id="description"
                            rows={5}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="form-group mb-4">
                        <label
                            htmlFor="tags"
                            className="block text-xl font-semibold text-gray-700 dark:text-gray-300"
                        >
                            Tags (comma separated)
                        </label>
                        <input
                            type="text"
                            className="form-control mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-zinc-800   dark:text-gray-400"
                            id="tags"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group mb-4">
                        <label htmlFor="image" className="block text-xl font-semibold text-gray-700 dark:text-gray-300"
                        >
                            Image
                        </label>
                        <input
                            type="file"
                            className="form-control mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:bg-zinc-800   dark:text-gray-400"
                            id="image"
                            onChange={handleImageChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
                    >
                        Publish Blog
                    </button>

                </form>
            </div>
        </div>
    );
};

export default AddBlogPage;
