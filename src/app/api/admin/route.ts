import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { password } = await request.json();
        console.log("Password", password)

        if (password === process.env.PASSWORD) {
            console.log("Password verified")
            return NextResponse.json({ success: true, message: "Password verified" });
        } else {
            return NextResponse.json({ success: false, message: "Wrong Password" }, { status: 401 });
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Error in verifying Admin" }, { status: 500 });
    }
}