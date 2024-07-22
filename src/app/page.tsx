"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import FeaturedPosts from "@/components/Home/FeaturedPosts";
import HomeCoverSection from "@/components/Home/HomeCoverSection";
import RecentPosts from "@/components/Home/RecentPosts";

import AllBlogs from "@/utils/AllBlogs"
import FetchAllBlog from "@/utils/FetchAllBlog";

export default function Home() {
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
  console.log(blogs)

  if (loading) {
    return <div className='text-center text-white'>Loading...</div>;
  }

  return (
    <main className="">
      <HomeCoverSection blogs={blogs} />
      <FeaturedPosts blogs={blogs} />
      <RecentPosts blogs={blogs} />
    </main>
  );
}
