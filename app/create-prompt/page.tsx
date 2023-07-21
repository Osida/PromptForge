import React from "react";
import {PromptForm} from "@/components";
import {getServerSession} from "next-auth/next";
import {nextAuthOptions} from "@/lib/nextauth/authOptions";
import {AuthRequiredError} from "@/utils/exceptions";

const getSessionData = async () => {
    return await getServerSession(nextAuthOptions);
};

const createPromptData = {
    title: "Script Your AI Assistant",
    subtitle: "Compose innovative prompts that foster deeper interactions with your AI. Expand the limits of digital conversations and discover uncharted territories.",
};

const CreatePrompt = async () => {
    const session = await getSessionData();

    if (!session) throw new AuthRequiredError();

    return (
        <main className={"container w-full mt-16"}>
            <PromptForm
                title={createPromptData.title}
                subtitle={createPromptData.subtitle}
                btnOneText={"Cancel"}
                btnTwoText={"Create"}
                handleSubmitMethod={"POST"}
            />
        </main>
    );
};

export default CreatePrompt;
