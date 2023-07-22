// "use client";
import React from "react";
import {Description, ProfileFeed, Title} from "@/components";
import {AuthRequiredError} from "@/utils/exceptions";
import {getServerSession} from "next-auth/next";
import {nextAuthOptions} from "@/lib/nextauth/authOptions";

// const getSessionData = async () => {
//     return await getServerSession(nextAuthOptions);
// };

const profileData = {
    title: "Your AI Canvas",
    description: "Dive into your personal AI journey. Explore your past prompts, drafts, and ideas, shaping the way you interact with AI.",
};

const Profile = async () => {
    // const {data: session} = useSession();
    const session = await getServerSession(nextAuthOptions);

    if (!session) throw new AuthRequiredError();

    return (
        <main className={"container w-full mt-16"}>
            <Title styles={"mb-6 mt-20 bg-gradient-to-r text-gradient-violet-pink"}>{profileData.title}</Title>
            <Description styles={"max-w-4xl mb-16"}>{profileData.description}</Description>
            <ProfileFeed/>
        </main>
    );
};

export default Profile;
