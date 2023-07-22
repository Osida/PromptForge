"use client";
import React from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import {PromptSchema} from "@/types";
import {CardSkeleton, Description} from "@/components";
import {useQuery} from "@tanstack/react-query";
import {endpoints, homeData} from "@/constants";
import {useForm, useWatch} from "react-hook-form";
import useSearchFilter from "@/hooks/useSearchFilter";
import {useSession} from "next-auth/react";

const Card = dynamic(() => import("@/components/card/Card"), {loading: () => <CardSkeleton/>});

const HomeFeed = () => {
    const {data: session, status} = useSession();
    const getAllPrompts = async () => {
        const {data, status} = await axios.get<PromptSchema[]>(endpoints.getAllPrompts);
        if (status !== 200) throw new Error("Error fetching prompts");
        return data;
    };

    const {register, control} = useForm();

    const searchValue = useWatch({control, name: "search"});

    const {isLoading, isError, data, error} = useQuery<PromptSchema[]>({queryKey: ["prompts"], queryFn: getAllPrompts});

    const filteredData = useSearchFilter(data, searchValue);

    const renderFeedContent = () => {
        if (isLoading) return <LoadingCard/>;
        if (isError)
            return (
                <>
                    <article className="toast toast-start">
                        <div className="alert alert-error">
                            <p>Error getting prompts.</p>
                        </div>
                    </article>
                </>
            );
        if (filteredData?.length === 0) return (<Description>{`${session?.user?.name} has no prompts`}</Description>);
        return filteredData?.map(({creator, hashtags, prompt, _id}, index) => (
            <Card
                key={_id}
                creator={creator}
                promptId={_id}
                prompt={prompt}
                hashtags={hashtags}
                canEditCard={false}
            />
        ));
    };

    return (
        <>
            <div
                className={"form-control mt-16 mb-28 drop-shadow-xl mx-auto w-full max-w-3xl"}>
                <input
                    {...register("search", {required: false})}
                    type={"text"}
                    placeholder={homeData.placeholder}
                    className={"input input-md input-bordered w-full bg-neutral placeholder-gray-400 text-white"}
                />
                {/*{errors.search && <ErrorText text={homeData.errorTxt} style={"mt-4"}/>}*/}
            </div>

            <section className={"space-y-6 md:columns-2 md:gap-6 xl:columns-3 w-full"}>
                {renderFeedContent()}
            </section>
        </>
    );
};


const LoadingCard = () => {
    const data = Array(8).fill(0);
    return (
        <>
            {data.map((_, index) => <CardSkeleton key={index}/>)}
        </>
    );
};

export default HomeFeed;
