import axios from "axios";
import { Blog } from "@/types/blog";

const fetchBlogs = async (): Promise<Blog[] | undefined> => {
    try {
        const response = await axios.get('http://localhost:3000/api/blog');
        return response.data.allBlog;
    } catch (error) {
        console.error('Error fetching blogs:', error);
    }
};

export default fetchBlogs;