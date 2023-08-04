import cloudinary from 'cloudinary';
import connectMongoDB from '@/utils/mongodb';
import Byte from '@/models/byte';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return NextResponse.error("Method Not Allowed", { status: 405 });
  }

  const { songName, imageFile, audioFile, artist, likers, tags, comments } = req.body;

  try {
    // Upload audio file to Cloudinary
    const audioUploadResult = await cloudinary.v2.uploader.upload(audioFile, {
      resource_type: 'auto', // Automatically detect the file type
      folder: 'audio', // Optional: Specify a folder in your Cloudinary media library
    });

    // Upload image file to Cloudinary
    const imageUploadResult = await cloudinary.v2.uploader.upload(imageFile, {
      resource_type: 'auto', // Automatically detect the file type
      folder: 'images', // Optional: Specify a folder in your Cloudinary media library
    });

    // Save the data in your MongoDB database
    await connectMongoDB();
    await Byte.create({
      songName,
      imageFile: imageUploadResult.secure_url,
      audioFile: audioUploadResult.secure_url,
      artist,
      likers,
      tags,
      comments,
    });

    return res.status(201).json({ message: 'Byte Created' });
  } catch (error) {
    console.error('Error creating byte:', error);
    return res.status(500).json({ error: 'Error creating byte' });
  }
}
