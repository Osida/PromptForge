"use client";
import React from "react";
import axios from "axios";
import {fonts} from "@/public";
import {Description} from "@/components";
import HomeFeed from "@/components/feed/HomeFeed";
import {homeData} from "@/constants";

export interface User {
    _id: string;
    name: string;
    email: string;
    image: string;
    emailVerified: null | string;
}

export interface Prompt {
    _id: string;
    creator: User;
    prompt: string;
    hashtags: string;
    timeStamp: string;
    __v: number;
}

// You can use this to type an array of prompts
export type TypePrompts = Prompt[];
export type TypePrompt = Prompt;

const getPrompts = async () => {
    const {data, status} = await axios.get<TypePrompts>("/api/prompt");
    if (status !== 200) throw new Error("Error fetching prompts");
    return data;
};

const Home = () => {
    return (
        <main className={"container w-full flex-column--center mt-16"}>
            <h1 className={`component-title mt-20 mb-8 text-center ${fonts.roboto.className}`}>
                {homeData.title} <br className={"max-md:hidden"}/>
                <span className={"bg-gradient-to-r text-gradient-violet-pink-lime"}>{homeData.span}</span>
            </h1>
            <Description styles={"text-center mx-auto max-w-3xl"}>
                {homeData.description}
            </Description>
            <HomeFeed
                showSearchbar={true}
                queryKey={"prompts"}
                queryFn={getPrompts}
            />
        </main>
    );
};


export default Home;