import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define the schema for 'prompts' collection
export const promptSchema = new mongoose.Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        // required: [true, "Creator is required"]
    },
    prompt: {
        type: String,
        required: [true, "Prompt cannot be empty."]
    },
    hashtags: {
        type: String,
        required: [true, "Hashtags are required"]
    },
    timeStamp: {
        type: Date,
        default: Date.now,
    }
});

// Extend the 'prompts' schema with 'timeStamp' field
// promptsSchema.add({
//     timeStamp: {
//         type: Date,
//         default: Date.now,
//     }
// });
