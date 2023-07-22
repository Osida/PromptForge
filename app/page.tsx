import React from "react";
import {fonts} from "@/public";
import {Description, HomeFeed} from "@/components";
import {homeData} from "@/constants";

const Home = () => {
    return (
        <main className={"container w-full flex-column--center mt-16"}>
            <h1 className={`component-title mt-20 mb-8 text-center ${fonts.roboto.className}`}>
                {homeData.title} <br className={"max-md:hidden"}/>
                <span className={"bg-gradient-to-r text-gradient-violet-pink-lime"}>{homeData.span}</span>
            </h1>
            <Description styles={"text-center mx-auto max-w-3xl"}>{homeData.description}</Description>
            <HomeFeed/>
        </main>
    );
};


export default Home;