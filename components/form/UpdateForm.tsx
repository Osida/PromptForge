"use client";
import React, {useEffect} from "react";
import {useSession} from "next-auth/react";
import {useRouter, useSearchParams} from "next/navigation";
import {useForm} from "react-hook-form";
import {FormSchema, PromptSchema} from "@/types";
import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {endpoints} from "@/constants";
import ErrorText from "../text/ErrorText";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface MutationPatch extends FormSchema {
    userId: string;
}

const UpdateForm = () => {
    const {data: session} = useSession();

    const router = useRouter();

    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const getPromptDetails = async () => {
        if (!id) throw new Error("No prompt id found");
        const {data, status} = await axios.get<PromptSchema>(endpoints.promptDetails(id));
        if (status !== 200) throw new Error("Error fetching prompts");
        return data;
    };

    const {isLoading, isError, data, error} = useQuery({
        queryKey: ["details"],
        queryFn: getPromptDetails,
        enabled: !!id,
    });

    const {register, handleSubmit, formState: {errors}, reset, setValue} = useForm<FormSchema>();

    const mutationPatch = useMutation({
        mutationFn: ({prompt, hashtags}: FormSchema) => {
            return axios.patch(endpoints.promptDetails(id!), {
                prompt,
                hashtags,
            });
        },
        onSuccess: (data, variables, context) => {
            router.push("/");
            console.log(`Successfully updated prompt: `, data?.data);
        },
        onError: (error, variables, context) => {
            console.log(`Failed to update prompt: `, error);
        },
    });

    const onSubmit = (formData: FormSchema) => {
        console.log("formData: ", formData);
        mutationPatch.mutate({
            prompt: formData?.prompt,
            hashtags: formData?.hashtags,
        });
        reset();
    };

    useEffect(() => {
        if (data) {
            setValue("prompt", data.prompt);
            setValue("hashtags", data.hashtags);
        }
    }, [data, setValue]);


    return (
        <section>
            <form onSubmit={handleSubmit(onSubmit)} className={"space-y-4 mt-16 max-w-4xl"}>
                <div className={"form-control"}>
                    <label className={"label"}>
                        <span className={"label-text font-bold"}>Your AI Prompt</span>
                    </label>
                    {data !== undefined
                        ? <textarea
                            {...register("prompt", {required: true})}
                            className={"textarea textarea-bordered h-60 placeholder-gray-400 text-white "}
                            placeholder={`Write your post here`}
                        /> :
                        <div>
                            <Skeleton height={250} baseColor={"#191e25"} highlightColor={"#242b33"}/>
                        </div>
                    }
                </div>
                {errors.prompt && <ErrorText text={"This field is required"}/>}

                <div className={"form-control w-full"}>
                    <label className={"label"}>
                        <span className={"label-text font-bold"}>Field of Prompt (#assistant, #idea, etc.)</span>
                    </label>
                    {data !== undefined ?
                        <input
                            {...register("hashtags", {required: true})}
                            type={"text"}
                            placeholder={`Hashtags`}
                            className={"input--default"}
                        /> :
                        <div>
                            <Skeleton height={50} baseColor={"#191e25"} highlightColor={"#242b33"}/>
                        </div>}
                </div>
                {errors.hashtags && <ErrorText text={"This field is required"}/>}

                <div className={"flex items-center justify-end space-x-3"}>
                    <button
                        type={"reset"}
                        onClick={() => reset()}
                        className={"btn text-white rounded-full"}
                    >
                        Cancel
                    </button>
                    <button
                        type={"submit"}
                        className={"btn rounded-full text-base-100 bg-gradient-pink-lime"}
                    >
                        Post
                    </button>
                </div>
            </form>
        </section>
    );
};

export default UpdateForm;
