import React from "react";
import {Description, Title} from "@/components";
import {getServerSession} from "next-auth/next";
import {nextAuthOptions} from "@/lib/nextauth/authOptions";
import {AuthRequiredError} from "@/utils/exceptions";
import CreateForm from "@/components/form/CreateForm";

const createPromptData = {
    title: "Script Your AI Assistant",
    subtitle: "Compose innovative prompts that foster deeper interactions with your AI. Expand the limits of digital conversations and discover uncharted territories.",
};

const CreatePrompt = async () => {
    const session = await getServerSession(nextAuthOptions);

    if (!session) throw new AuthRequiredError();

    return (
        <main className={"container w-full mt-16"}>
            <Title styles={"mb-6 mt-20 bg-gradient-to-r text-gradient-pink-lime"}>{createPromptData.title}</Title>
            <Description styles={"max-w-4xl"}>{createPromptData.subtitle}</Description>
            <CreateForm/>
        </main>
    );
};

export default CreatePrompt;
