"use client";
import React, {useEffect, useState} from "react";
import PromptForm from "@/components/prompt-form/PromptForm";
import {useSession} from "next-auth/react";
import {AuthRequiredError} from "@/utils/exceptions";
import {useRouter, useSearchParams} from "next/navigation";
import axios from "axios";
import {TypePrompt} from "@/app/page";
import {linksData} from "@/constants";
import {useQuery} from "@tanstack/react-query";

const updatePromptData = {
    title: "Edit Your AI Assistant",
    subtitle: "Polish your prompts to perfection. Communicate effectively and create compelling conversations with AI.",
};

const getPromptDetails = async (promptId: string) => {
    const {data, status} = await axios.get<TypePrompt>(`/api/prompt/${promptId}`);
    if (status !== 200) throw new Error("Error fetching user prompt details");
    return data;
};

const UpdatePrompt = () => {
    const {data: session} = useSession();
    if (!session) throw new AuthRequiredError();

    const router = useRouter();
    const [post, setPost] = useState<TypePrompt | null>(null);
    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");

    if (!promptId) throw new Error("Prompt ID is missing");

    const {isLoading, error, data} = useQuery<TypePrompt>({
        queryKey: ["getPromptDetails", promptId],
        queryFn: () => getPromptDetails(promptId),
    });


    if (isLoading) return "Loading...";

    if (error) return "An error has occurred: " + error;

    return (
        <main className={"container w-full mt-16"}>
            {/*<PromptForm*/}
            {/*    title={updatePromptData.title}*/}
            {/*    subtitle={updatePromptData.subtitle}*/}
            {/*    btnOneText={"Cancel"}*/}
            {/*    btnTwoText={"Edit"}*/}
            {/*    handleSubmitMethod={"PATCH"}*/}
            {/*    promptId={promptId}*/}
            {/*    prompt={data?.prompt}*/}
            {/*    hashtags={data?.hashtags}*/}
            {/*/>*/}
        </main>
    );
};

export default UpdatePrompt;
