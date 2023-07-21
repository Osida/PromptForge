import {connectToDBWithMongoose} from "@/lib/mongodb/db";
import {Prompt} from "@/lib/mongodb/models";
import mongoose from "mongoose";

interface IRequestBody {
    userId: string;
    prompt: string;
    hashtags: string;
}

export const POST = async (req: Request) => {
    const {userId, prompt, hashtags} = await req.json() as IRequestBody;

    const connection = await connectToDBWithMongoose();

    if (!connection) {
        return new Response(JSON.stringify("Failed to connect to database"), {status: 500});
    }

    try {
        const newPrompt = new Prompt({
            creator: new mongoose.Types.ObjectId(userId),
            prompt,
            hashtags
        });

        const savedPrompt = await newPrompt.save();

        return new Response(JSON.stringify(savedPrompt), {status: 200});
    } catch (error) {
        console.error(`Error: ${error}`);
        return new Response(JSON.stringify("An error occurred while saving the prompt: ${error}"), {status: 500});
    }
};