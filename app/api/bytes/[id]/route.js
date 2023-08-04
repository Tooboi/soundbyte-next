import connectMongoDB from "@/utils/mongodb";
import Byte from "@/models/byte";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newSongName: songName, newImageFile: imageFile, newAudioFile: audioFile, newArtist: artist, newLikers: likers, newTags: tags, newComments: comments } = await request.json();
    await connectMongoDB();
    await Byte.findByIdAndUpdate(id, { songName, imageFile, audioFile, artist, likers, tags, comments });
    return NextResponse.json({ message: "Byte Updated" }, { status: 200 })
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const byte = await Byte.findOneAndDelete({ _id: id });
    return NextResponse.json({ byte }, { status: 200 });
}