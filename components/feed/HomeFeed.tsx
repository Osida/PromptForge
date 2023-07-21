"use client";
import React from "react";
import {useQuery} from "@tanstack/react-query";
import {CardSkeleton, Description} from "@/components";
import {useForm, useWatch} from "react-hook-form";
import dynamic from "next/dynamic";
import {TypePrompts} from "@/app/page";
import {homeData} from "@/constants";
import useSearchFilter from "@/hooks/useSearchFilter";

const Card = dynamic(
    () => import("@/components/card/Card"),
    {loading: () => <CardSkeleton canEditCard={false}/>}
);

interface IHomeFeed {
    showSearchbar: boolean;
    queryKey: string;
    userId?: string;
    queryFn: (userId?: string) => Promise<TypePrompts>;
    canEditCard?: boolean;

}

const HomeFeed = ({queryKey, queryFn, showSearchbar, userId, canEditCard}: IHomeFeed) => {
    const {register, formState: {errors}, reset, control} = useForm();
    const {isLoading, isError, data, error} = useQuery<TypePrompts>([queryKey, userId], () => queryFn(userId));
    const searchValue = useWatch({control, name: "search"});
    const filteredData = useSearchFilter(data, searchValue);

    const renderFeedContent = () => {
        if (isLoading) {
            return <LoadingCard/>;
        }
        if (isError) {
            return <Description styles={"text-center mx-auto max-w-3xl"}>Error getting prompts</Description>;
        }
        return filteredData?.map(({creator, hashtags, prompt, _id: promptId}, index) => (
            <Card
                key={promptId}
                promptId={promptId}
                prompt={prompt}
                hashtags={hashtags}
                email={creator.email}
                name={creator.name}
                image={creator.image}
                creatorId={creator._id}
                canEditCard={canEditCard || false}
            />
        ));
    };

    return (
        <>
            {showSearchbar &&
                (
                    <div
                        className={"form-control mt-16 mb-28 drop-shadow-xl mx-auto w-full max-w-3xl"}>
                        <input
                            {...register("search", {required: true})}
                            type={"text"}
                            placeholder={homeData.placeholder}
                            className={"input input-md input-bordered w-full bg-neutral placeholder-gray-400 text-white"}
                        />
                        {/*{errors.search && <ErrorText text={homeData.errorTxt} style={"mt-4"}/>}*/}
                    </div>
                )}

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
            {
                data.map((_, index) => (
                    <CardSkeleton key={index} canEditCard={false}/>
                ))
            }
        </>
    );
};

export default HomeFeed;
