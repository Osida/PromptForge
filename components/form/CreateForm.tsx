"use client";
import axios from "axios";
import React from "react";
import {FormSchema} from "@/types";
import {endpoints} from "@/constants";
import {useForm} from "react-hook-form";
import ErrorText from "../text/ErrorText";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import {useMutation} from "@tanstack/react-query";
import {ExtendedSession} from "@/lib/nextauth/authOptions";

interface MutationPost extends FormSchema {
    userId: string;
}

const CreateForm = () => {
    const {data: session} = useSession();
    const router = useRouter();
    const {register, handleSubmit, formState: {errors}, reset} = useForm<FormSchema>();

    const mutationPost = useMutation({
        mutationFn: ({prompt, hashtags, userId}: MutationPost) => {
            return axios.post(endpoints.postPrompt, {
                userId,
                prompt,
                hashtags,
            });
        },
        onSuccess: (data, variables, context) => {
            router.push("/");
            console.log(`Successfully posted prompt: `, data?.data);
        },
        onError: (error, variables, context) => {
            console.log(`Failed to post prompt: `, error);
        },
    });

    const onSubmit = (formData: FormSchema) => {
        mutationPost.mutate({
            prompt: formData?.prompt,
            hashtags: formData?.hashtags,
            userId: (session as ExtendedSession)?.user_id
        });
        reset();
    };

    return (
        <section>
            <form onSubmit={handleSubmit(onSubmit)} className={"space-y-4 mt-16 max-w-4xl"}>
                <div className={"form-control"}>
                    <label className={"label"}>
                        <span className={"label-text font-bold"}>Your AI Prompt</span>
                    </label>
                    <textarea
                        {...register("prompt", {required: true})}
                        className={"textarea textarea-bordered h-60 placeholder-gray-400 text-white "}
                        placeholder={"Write your post here"}
                    />
                </div>
                {errors.prompt && <ErrorText text={"This field is required"}/>}

                <div className={"form-control w-full"}>
                    <label className={"label"}>
                        <span className={"label-text font-bold"}>Field of Prompt (#assistant, #idea, etc.)</span>
                    </label>
                    <input
                        {...register("hashtags", {required: true})}
                        type={"text"}
                        placeholder={"#Hashtags"}
                        className={"input--default"}
                    />
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

export default CreateForm;
