"use client";
import React, {useEffect, useState} from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import {PromptSchema} from "@/types";
import {CardSkeleton, Description} from "@/components";
import {useQuery} from "@tanstack/react-query";
import {endpoints, homeData} from "@/constants";
import {useForm, useWatch} from "react-hook-form";
import useSearchFilter from "@/hooks/useSearchFilter";
import {useSession} from "next-auth/react";
import {ExtendedSession} from "@/lib/nextauth/authOptions";
import {useRouter} from "next/navigation";

const Card = dynamic(() => import("@/components/card/Card"), {loading: () => <CardSkeleton/>});

const ProfileFeed = () => {
    const {data: session, status} = useSession();
    const id = (session as ExtendedSession)?.user_id;
    const [filter_data, setFilter_data] = useState(null);

    const getUserPrompts = async () => {
        const {data, status} = await axios.get<PromptSchema[]>(endpoints.getUserPrompts(id));
        if (status !== 200) throw new Error("Error fetching prompts");
        return data;
    };

    const {register, control} = useForm();

    const searchValue = useWatch({control, name: "search"});

    const {isLoading, isError, data, error} = useQuery<PromptSchema[]>({
        queryKey: ["userPrompts"],
        queryFn: getUserPrompts,
        enabled: !!id,
    });

    const filteredData = useSearchFilter(data, searchValue);

    const router = useRouter();

    const handleEdit = (promptId: string) => {
        router.push(`/update-prompt?id=${promptId}`);
    };


    const handleDelete = async (promptId: string) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
        if (hasConfirmed) {
            try {
                const {data} = await axios.delete<PromptSchema>(endpoints.promptDetails(promptId));
                console.log("data: ", data);
            } catch (err) {
                throw new Error(`Error deleting prompt: ${err}`);
            }
        }
    };

    const renderFeedContent = () => {
        if (isLoading) return <LoadingCard/>;
        if (isError && status !== "loading")
            return (
                <>
                    <article className="toast toast-start">
                        <div className="alert alert-error">
                            {/*@ts-ignore*/}
                            <p>{`Error getting user prompts. ${error?.message}`}</p>
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
                canEditCard={true}
                handleEdit={() => handleEdit(_id)}
                handleDelete={() => handleDelete(_id)}
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

export default ProfileFeed;
