import dbConnect from "@/lib/config/db";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { slug } from "github-slugger";
import Blog from "@/lib/model/blog.model";


const LoadDb = async () => {
    await dbConnect();
}

LoadDb();

export async function GET(request: Request) {
    return NextResponse.json({ message: "Hello from the API!" });
}

export async function POST(request: Request) {
    const formData = await request.formData();
    const timestamp = Date.now();
    console.log(formData)
    const image = formData.get("image") as File;
    const imageByteData = await image?.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image?.name}`;
    await writeFile(path, buffer);
    const imageUrl = `/${timestamp}_${image?.name}`;
    console.log(imageUrl);

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
    console.log("New Blog saved :: ", newBlog);

    // return NextResponse.json({ message: "Image uploaded successfully!" });
    return NextResponse.json({ success: true, message: "Blog created successfully!" });
}

