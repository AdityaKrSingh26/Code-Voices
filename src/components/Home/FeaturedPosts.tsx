import React from 'react'
import BlogLayoutOne from "../Blog/BlogLayoutOne";
import BlogLayoutTwo from "../Blog/BlogLayoutTwo";
import ImagePath from "./carlos-muza-hpjSkU2UYSU-unsplash.jpg"

const FeaturedPosts = ({ blogs }: any) => {

    const blog1 = blogs[1];
    const blog2 = blogs[2];
    const blog3 = blogs[3];
    // const blog = {
    //     title: "Hello Everyoune! Welcome to my blog!",
    //     description: "This is a blog where I write about my experiences and thoughts on various topics. I hope you enjoy reading it as much as I enjoy writing it. Feel free to leave a comment or share your thoughts with me. I would love to hear from you!",
    //     tags: "Personal",
    //     url: "#",
    //     image: ImagePath
    // }

    return (
        <section className="w-full mt-10 sm:mt-20  md:mt-15 px-5 sm:px-10 md:px-24  sxl:px-32 flex flex-col items-center justify-center">

            <h2 className="w-full inline-block font-extrabold capitalize text-2xl md:text-5xl text-dark dark:text-light">
                Featured Posts
            </h2>

            <div className="grid grid-cols-2 grid-rows-2 gap-6  mt-5 sm:mt-10">

                <article className=" col-span-2  sxl:col-span-1 row-span-2 relative">
                    <BlogLayoutOne
                        blog={blog1}
                    />
                </article>

                <article className=" col-span-2 sm:col-span-1 row-span-1 relative">
                    <BlogLayoutTwo
                        blog={blog2}
                    />
                </article>

                <article className="col-span-2 sm:col-span-1 row-span-1 relative">
                    <BlogLayoutTwo
                        blog={blog3}
                    />
                </article>

            </div>

        </section>
    );
};

export default FeaturedPosts;