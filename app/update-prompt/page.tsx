import React from "react";
import {AuthRequiredError} from "@/utils/exceptions";
import {Description, Title} from "@/components";
import {getServerSession} from "next-auth/next";
import {nextAuthOptions} from "@/lib/nextauth/authOptions";
import UpdateForm from "@/components/form/UpdateForm";

const updatePromptData = {
    title: "Edit Your AI Assistant",
    subtitle: "Polish your prompts to perfection. Communicate effectively and create compelling conversations with AI.",
};

const UpdatePrompt = async () => {
    const session = await getServerSession(nextAuthOptions);

    if (!session) throw new AuthRequiredError();

    return (
        <main className={"container w-full mt-16"}>
            <Title styles={"mb-6 mt-20 bg-gradient-to-r text-gradient-pink-lime"}>{updatePromptData.title}</Title>
            <Description styles={"max-w-4xl"}>{updatePromptData.subtitle}</Description>
            <UpdateForm/>
        </main>
    );
};

export default UpdatePrompt;
