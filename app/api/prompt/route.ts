import {Prompt} from "@/lib/mongodb/models";
import {connectToDBWithMongoose} from "@/lib/mongodb/db";

export const GET = async () => {
    const connection = await connectToDBWithMongoose();

    if (!connection) {
        return new Response(JSON.stringify("Failed to connect to database"), {status: 500});
    }

    try {
        const prompts = await Prompt.find({}).populate("creator");
        return new Response(JSON.stringify(prompts), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify(`Failed to fetch all prompts: \n${error}`), {status: 500});
    }
};