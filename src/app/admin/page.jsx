import React from 'react'
import Link from 'next/link'

function AdminPage() {
    return (
        <div className='w-full h-full dark:text-white'>
            <h1 className='text-center font-bold text-5xl'>
                Welcome Admin
            </h1>
            <div className="text-center mt-10">
                <Link href="/admin/addBlog" className='m-5'>
                    <button
                        className="inline-block bg-blue-500 text-white py-2 px-10 rounded hover:bg-blue-700"
                    >
                        Add Blog
                    </button>
                </Link>
                <Link href="/admin/addBlog" className='m-5'>
                    <button
                        className="inline-block bg-blue-500 text-white py-2 px-10 rounded hover:bg-blue-700"
                    >
                        Blog List
                    </button>
                </Link>
                <Link href="/admin/addBlog" className='m-5'>
                    <button
                        className="inline-block bg-blue-500 text-white py-2 px-10 rounded hover:bg-blue-700"
                    >
                        View Subscribed Emails
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default AdminPage
