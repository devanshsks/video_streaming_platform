import mongoose from "mongoose";

const PlayListSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        playlistName: { type: String, required: true },
        media: { type: Array, default: [] },
        isPrivate: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const PlayList = mongoose.model("PlayList", PlayListSchema);
export default PlayList;