"use client";
import React, {useEffect} from "react";
import {Description, Title} from "@/components";
import {AuthRequiredError} from "@/utils/exceptions";
import HomeFeed from "@/components/feed/HomeFeed";
import axios from "axios";
import {TypePrompts} from "@/app/page";
import {useSession} from "next-auth/react";
import {ExtendedSession} from "@/lib/nextauth/authOptions";

// const getSessionData = async () => {
//     return await getServerSession(nextAuthOptions);
// };

const profileData = {
    title: "Your AI Canvas",
    description: "Dive into your personal AI journey. Explore your past prompts, drafts, and ideas, shaping the way you interact with AI.",
};

const getUserPrompts = async (userId?: string) => {
    if(!userId) throw new Error("User ID is required.");
    const {data, status} = await axios.get(`/api/users/${userId}/prompts`);
    if (status !== 200) throw new Error("Error fetching user prompts");
    return data;
};

const Profile = () => {
    const {data: session} = useSession();

    if (!session) throw new AuthRequiredError();

    return (
        <main className={"container w-full mt-16"}>
            <Title
                text={profileData.title}
                styles={"mb-6 mt-20 bg-gradient-to-r text-gradient-violet-pink"}
            />
            <Description styles={"max-w-4xl mb-16"}>
                {profileData.description}
            </Description>

            <HomeFeed
                showSearchbar={true}
                queryKey={"userPrompts"}
                userId={(session as ExtendedSession)?.user_id}
                queryFn={getUserPrompts}
                canEditCard={true}
            />
        </main>
    );
};

export default Profile;
