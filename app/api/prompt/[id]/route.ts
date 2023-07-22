import {Prompt} from "@/lib/mongodb/models";
import {connectToDBWithMongoose} from "@/lib/mongodb/db";
import {NextRequest} from "next/server";

interface PatchRequestBodySchema {
    prompt: string;
    hashtags: string;
}

export const GET = async (req: NextRequest, {params}: { params: { id: string } }) => {
    const connection = await connectToDBWithMongoose();

    if (!connection) {
        return new Response(JSON.stringify("Failed to connect to database"), {status: 500});
    }

    try {
        const prompts = await Prompt.findById(params.id).populate("creator");
        return new Response(JSON.stringify(prompts), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify(`Failed to fetch all prompts: \n${error}`), {status: 500});
    }
};

export const PATCH = async (req: NextRequest, {params}: { params: { id: string } }) => {
    const {prompt, hashtags} = await req.json() as PatchRequestBodySchema;

    const connection = await connectToDBWithMongoose();

    if (!connection) {
        return new Response(JSON.stringify("Failed to connect to database"), {status: 500});
    }

    try {
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt not found", {status: 404});
        }

        existingPrompt.prompt = prompt;
        existingPrompt.hashtags = hashtags;
        await existingPrompt.save();

        return new Response("Successfully updated the Prompts", {status: 200});
    } catch (error) {
        return new Response(JSON.stringify(`Failed to update prompt: \n${error}`), {status: 500});
    }
};

export const DELETE = async (req: NextRequest, {params}: { params: { id: string } }) => {
    const connection = await connectToDBWithMongoose();

    if (!connection) {
        return new Response(JSON.stringify("Failed to connect to database"), {status: 500});
    }

    try {
        const removedPrompt = await Prompt.findByIdAndRemove(params.id);

        return new Response(`Successfully removed prompt: \n${JSON.stringify(removedPrompt)}`, {status: 200});
    } catch (error) {
        return new Response(JSON.stringify(`Failed to remove prompt: \n${error}`), {status: 500});
    }
};