import dbConnect from "@/lib/config/db";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { slug } from "github-slugger";
import Blog from "@/lib/model/blog.model";

// Ensure database connection
const LoadDb = async () => {
    await dbConnect();
}

LoadDb();

// Handle GET request to fetch all blogs
export async function GET() {
    try {
        const allBlog = await Blog.find({});
        return NextResponse.json({ allBlog });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

// Handle POST request to create a new blog
export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const timestamp = Date.now();
        const image = formData.get("image") as File;

        if (!image) {
            return NextResponse.json({ success: false, message: "Image is required!" }, { status: 400 });
        }

        const imageByteData = await image.arrayBuffer();
        const buffer = Buffer.from(imageByteData);
        const path = `./public/${timestamp}_${image.name}`;
        await writeFile(path, buffer);
        const imageUrl = `/${timestamp}_${image.name}`;

        const blogData = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            tags: (formData.get("tags") as string).split(","),
            url: `/blog/${slug(formData.get("title") as string)}`,
            image: imageUrl,
            isPublished: true,
            publishedAt: Date.now()
        }

        const newBlog = new Blog(blogData);
        await newBlog.save();

        return NextResponse.json({ success: true, message: "Blog created successfully!" });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

// Handle DELETE request to delete a blog by ID
export async function DELETE(request: Request) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get("id");
        if (!id)
            return NextResponse.json({ success: false, message: "ID is required!" }, { status: 400 });
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) 
            return NextResponse.json({ success: false, message: "Blog not found!" }, { status: 404 });
        return NextResponse.json({ success: true, message: "Blog deleted successfully!" });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
