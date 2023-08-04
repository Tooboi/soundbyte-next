import mongoose, { Schema } from "mongoose";

const byteSchema = new Schema(
    {
        songName: String,
        imageFile: String,
        audioFile: String,
        artist: String,
        likers: [],
        tags: [],
        comments: [],
    },
    {
        timestamps: true,
    },
);

const Byte = mongoose.models.Byte || mongoose.model("Byte", byteSchema);

export default Byte;