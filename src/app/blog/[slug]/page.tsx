import BlogDetails from "@/components/Blog/BlogDetails";
import Tag from "@/components/Elements/Tag";
import siteMetadata from "@/utils/siteMetaData";
import allBlogs from "@/utils/AllBlogs";
import { slug } from "github-slugger";
import Image from "next/image";
import { notFound } from "next/navigation";
import ImagePath from "@/components/image.jpg"

export async function generateStaticParams() {
    return allBlogs.map((blog) => ({ slug: slug(blog.title) }));
}

export async function generateMetadata({ params }: any) {
    const blog = allBlogs.find((blog) => slug(blog.title) === params.slug);
    if (!blog) {
        return;
    }

    const publishedAt = new Date(blog.publishedAt).toISOString();

    let imageList = [siteMetadata.socialBanner];
    if (blog.image) {
        imageList =
            typeof blog.image === "string"
                ? [siteMetadata.siteUrl + blog.image]
                : blog.image;
    }
    const ogImages = imageList.map((img) => {
        return { url: img.includes("http") ? img : siteMetadata.siteUrl + img };
    });

    return {
        title: blog.title,
        description: blog.description,
        openGraph: {
            title: blog.title,
            description: blog.description,
            url: siteMetadata.siteUrl + "/blog/" + params.slug,
            siteName: siteMetadata.title,
            locale: "en_US",
            type: "article",
            publishedTime: publishedAt,
            images: ogImages,
            authors: [siteMetadata.author],
        },
        twitter: {
            card: "summary_large_image",
            title: blog.title,
            description: blog.description,
            images: ogImages,
        },
    };
}

export default function BlogPage({ params }: any) {
    const blog = allBlogs.find((blog) => slug(blog.title) === params.slug);

    if (!blog) {
        notFound();
    }

    let imageList = [siteMetadata.socialBanner];
    if (blog.image) {
        imageList =
            typeof blog.image === "string"
                ? [siteMetadata.siteUrl + blog.image]
                : blog.image;
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": blog.title,
        "description": blog.description,
        "image": imageList,
        "datePublished": new Date(blog.publishedAt).toISOString(),
        "author": [{
            "@type": "Person",
            "name": siteMetadata.author,
            "url": siteMetadata.twitter,
        }]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <article>
                <div className="mb-8 text-center relative w-full h-[70vh] bg-dark">
                    <div className="w-full z-10 flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Tag
                            name={blog.tags[0]}
                            link={`/categories/${slug(blog.tags[0])}`}
                            className="px-6 text-sm py-2"
                        />
                        <h1
                            className="inline-block mt-6 font-semibold capitalize text-light text-2xl md:text-3xl lg:text-5xl !leading-normal relative w-5/6"
                        >
                            {blog.title}
                        </h1>
                    </div>
                    <div className="absolute top-0 left-0 right-0 bottom-0 h-full bg-dark/60 dark:bg-dark/40" />
                    <Image
                        src={blog.image || ImagePath}
                        alt={blog.title}
                        className="aspect-square w-full h-full object-cover object-center"
                        priority
                        sizes="100vw"
                    />
                </div>
                <BlogDetails blog={blog} slug={params.slug} />

                <div className="dark:text-white text-center m-10 text-2xl">
                    {blog.description}
                </div>
            </article>
        </>
    );
}
