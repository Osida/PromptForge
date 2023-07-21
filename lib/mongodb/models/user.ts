import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User name cannot be empty."],
    },
    email: {
        type: String,
        required: [true, "User email cannot be empty."],
        unique: [true, "Email already exists."],
    },
    image: {
        type: String,
        required: false,
    },
    emailVerified: {
        type: Date,
        default: null,
    },
});
