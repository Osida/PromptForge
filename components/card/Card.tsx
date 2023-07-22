"use client";
import React, {useEffect, useState} from "react";
import {FiCopy} from "react-icons/fi";
import {BsCheckCircle} from "react-icons/bs";
import {useRouter} from "next/navigation";
import {convertHashtags} from "@/utils";
import {PromptSchema, UserSchema} from "@/types";
import axios from "axios";
import {endpoints} from "@/constants";

interface CardProps {
    creator: UserSchema;
    promptId: string;
    prompt: string;
    hashtags: string;
    canEditCard: boolean;
}

const Card = ({promptId, prompt, hashtags, creator, canEditCard}: CardProps) => {
    const [showDeleteToast, setShowDeleteToast] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const router = useRouter();
    const hasBeenCopied = false;

    const handleEdit = () => {
        router.push(`/update-prompt?id=${promptId}`);
    };


    const handleDelete = async () => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
        if (hasConfirmed) {
            try {
                const {data} = await axios.delete<PromptSchema>(endpoints.promptDetails(promptId));
                setShowDeleteToast(true);
                setTimeout(() => router.push("/profile"), 3000);
            } catch (err) {
                throw new Error(`Error deleting prompt: ${err}`);
            }
        }
    };

    useEffect(() => {
        setTags(convertHashtags(hashtags));
    }, [hashtags]);

    // useEffect(() => {
    //     setTimeout(() => setShowDeleteToast(false), 50000);
    // }, []);

    console.log("window ", window);
    return (
        <article className="card w-full h-fit bg-neutral shadow-xl flex-1 break-inside-avoid-column">
            <div className="card-body space-y-4">
                {/* Card Header: avatar, username, email, icon */}
                <div className={"flex items-center"}>
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img src={creator.image} alt={"Profile Image"}/>
                        </div>
                    </div>

                    <span className={"ml-3 flex-1"}>
                        <h6 className="text-sm font-medium">
                            {creator.name}
                        </h6>
                        <p className={"text-sm font-light"}>
                           {creator.email}
                        </p>
                    </span>

                    <button className={"btn btn-ghost btn-sm btn-circle bg-gray-700 "}>
                        {hasBeenCopied ?
                            <BsCheckCircle className={"w-4 h-4"}/> :
                            <FiCopy className={"w-4 h-4"}/>
                        }
                    </button>
                </div>

                {/* Card Body: prompt */}
                <p>{prompt}</p>

                {/* Card Footer: hashtags */}
                <div className="card-actions">
                    {tags.map((tag, index) => (
                        <>
                            <div key={`${tag}-${index}`} className={"btn btn-xs normal-case badge text-xs shadow-md"}>
                                <p>{tag}</p>
                            </div>
                        </>
                    ))}
                </div>
                {canEditCard && (
                    <div className="card-actions pt-2 justify-center">
                        <button onClick={handleEdit}
                                className="btn btn-sm btn-ghost text-xs font-medium bg-gradient-pink-lime text-white">
                            Edit
                        </button>
                        <button onClick={handleDelete} className="btn btn-sm text-xs font-medium text-white">
                            Delete
                        </button>
                    </div>
                )}
            </div>
            {showDeleteToast && (
                <div className="toast toast-start">
                    <div className="alert alert-success">
                        <span>Prompt removed</span>
                    </div>
                </div>
            )}
        </article>
    );
};

export default Card;
