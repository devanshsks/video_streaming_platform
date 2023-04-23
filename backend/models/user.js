import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
        email: { type: String, required: true, unique: true},
        password: { type: String, required: true},
        status: { type: Boolean, default: true },
        isAdmin: { type: Boolean, default: false },
        favorites: { type: Array, default: [] },
    },
    { timestamps: true }
);

const User = new mongoose.model("User", UserSchema);

export default User;