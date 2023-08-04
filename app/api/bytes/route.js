import connectMongoDB from "@/utils/mongodb";
import Byte from "@/models/byte";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { songName, imageFile, audioFile, artist, likers, tags, comments } = await request.json();
    await connectMongoDB();
    await Byte.create({ songName, imageFile, audioFile, artist, likers, tags, comments });
    return NextResponse.json({ message: "Byte Created" }, { status: 201 })
}

export async function GET() {
    await connectMongoDB();
    const bytes = await Byte.find();
    return NextResponse.json({ bytes })
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
        return NextResponse.json({ message: "ID parameter missing" }, { status: 400 });
    }
    await connectMongoDB();
    await Byte.findByIdAndDelete(id);
    return NextResponse.json({ message: "Byte Deleted" }, { status: 200 });
}

// export default async function handler(req, res) {
//     try {
//       await connectMongoDB();
//       const bytes = await Byte.find();
//       res.status(200).json({ bytes });
//     } catch (error) {
//       console.error("Error fetching bytes:", error);
//       res.status(500).json({ error: "Failed to fetch bytes" });
//     }
//   }