import {Prompt} from "@/lib/mongodb/models";
import {connectToDBWithMongoose} from "@/lib/mongodb/db";
import {NextRequest} from "next/server";

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