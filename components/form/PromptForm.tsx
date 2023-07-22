"use client";
import React from "react";
import axios from "axios";
import {useForm} from "react-hook-form";
import ErrorText from "../text/ErrorText";
import {useMutation} from "@tanstack/react-query";
import {useSession} from "next-auth/react";
import {ExtendedSession} from "@/lib/nextauth/authOptions";
import {useRouter} from "next/navigation";

interface IPromptForm {
    title: string;
    subtitle: string;
    btnOneText: string;
    btnTwoText: string;
    handleSubmitMethod: String;
    prompt?: string;
    hashtags?: string;
    promptId?: string;
}

interface IFormData {
    prompt: string;
    hashtags: string;
}

const PromptForm = ({
                        btnOneText,
                        btnTwoText,
                        handleSubmitMethod,
                        promptId,
                        prompt,
                        hashtags
                    }: IPromptForm) => {
        const {data: session} = useSession();
        const router = useRouter();
        const {register, handleSubmit, formState: {errors}, reset} = useForm<IFormData>({
            defaultValues: {
                prompt: prompt,
                hashtags: hashtags,
            }
        });

        const mutationPost = useMutation({
            mutationFn: (formData: IFormData) => {
                return axios.post("/api/prompt/new", {
                    userId: (session as ExtendedSession)?.user_id,
                    prompt: formData?.prompt,
                    hashtags: formData?.hashtags,
                });
            },
            onSuccess: (data, variables, context) => {
                console.log(`Successfully posted prompt: `, data);
                router.push("/");
            },
            onError: (error, variables, context) => {
                console.log(`Failed to post prompt: `, error);
            }
        });

        const mutationPatch = useMutation({
            // mutationFn: (formData) => {
            //     return axios.patch(`/api/prompt/id`, formData);
            // },
        });


        const onSubmit = (formData: IFormData) => {
            handleSubmitMethod === "POST" ? handlePostPrompt(formData) : handlePatchPrompt(formData);
            reset();
        };

        const handlePostPrompt = async (formData: IFormData) => {
            mutationPost.mutate(formData);
        };

        const handlePatchPrompt = async (formData: any) => {
            // mutationPatch.mutate(formData);
            console.log("patching prompt , formData: ", {...formData, promptId});
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
                            placeholder={"#Tag"}
                            className={"input--default"}
                        />
                    </div>
                    {errors.hashtags && <ErrorText text={"This field is required"}/>}

                    <div className={"flex items-center justify-end space-x-3"}>
                        <button
                            type={"reset"}
                            onClick={() => console.log("cancel clicked")}
                            className={"btn text-white rounded-full"}
                        >
                            {btnOneText}
                        </button>
                        <button
                            type={"submit"}
                            className={"btn rounded-full text-base-100 bg-gradient-pink-lime"}
                        >
                            {btnTwoText}
                        </button>
                    </div>
                </form>
            </section>
        );
    }
;

export default PromptForm;
;
;
