import dbConnect from "@/lib/config/db";
import { NextResponse } from "next/server";
import Email from "@/lib/model/email.model";

// Ensure database connection
const LoadDb = async () => {
    await dbConnect();
}
LoadDb();

// Handle GET request to fetch all emails
export async function GET() {
    try {

        const allEmail = await Email.find({});
        
        if (!allEmail)
            return NextResponse.json({ success: false, message: "No email found!" }, { status: 404 });

        return NextResponse.json({ success: true, allEmail: allEmail });

    } catch (error: any) {
        console.log("ERROR IN FETCHING EMAILS :: ", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

// Handle POST request to create a new email
export async function POST(request: Request) {
    try {

        const formData = await request.formData();
        console.log("FORM DATA :: ", formData);
        const email = formData.get("email") as string;
        const existingEmail = await Email.findOne({ email: email });

        if (existingEmail)
            return NextResponse.json({ success: false, message: "Email already exists!" }, { status: 400 });

        const newEmail = new Email({ email });
        await newEmail.save();
        return NextResponse.json({ success: true, message: "Email added successfully!" });

    } catch (error: any) {
        console.log("ERROR IN ADDING EMAIL :: ", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

// Handle DELETE request to delete an email
export async function DELETE(request: Request) {
    try {
        const { email } = await request.json();
        const deletedEmail = await Email.findOneAndDelete({ email: email });
        
        if (!deletedEmail) 
            return NextResponse.json({ success: false, message: "Email not found!" }, { status: 404 });

        return NextResponse.json({ success: true, message: "Email deleted successfully!" });
    } catch (error: any) {
        console.log("ERROR IN DElETING EMAIL :: ", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}