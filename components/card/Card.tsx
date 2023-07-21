"use client";
import React, {useEffect, useState} from "react";
import {FiCopy} from "react-icons/fi";
import {BsCheckCircle} from "react-icons/bs";
import {useRouter} from "next/navigation";
import {convertHashtags} from "@/utils";

interface ICard {
    creatorId: string;
    name: string;
    email: string;
    image: string;
    prompt: string;
    hashtags: string;
    promptId: string;
    canEditCard: boolean;
}

const Card = (props: ICard) => {
    const [hashtags, setHashtags] = useState<string[]>([]);
    const router = useRouter();
    const hasBeenCopied = false;

    const handleEdit = () => {
        router.push(`/update-prompt?id=${props.promptId}`);
    };

    useEffect(() => {
        const hashtagsArray = convertHashtags(props.hashtags);
        setHashtags(hashtagsArray);
    }, [props.hashtags]);


    return (
        <article className="card w-full h-fit bg-neutral shadow-xl flex-1 break-inside-avoid-column">
            <div className="card-body space-y-4">
                {/* Card Header: avatar, username, email, icon */}
                <div className={"flex items-center"}>
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img src={props.image} alt={"Profile Image"}/>
                        </div>
                    </div>

                    <span className={"ml-3 flex-1"}>
                        <h6 className="text-sm font-medium">
                            {props.name}
                        </h6>
                        <p className={"text-sm font-light"}>
                           {props.email}
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
                <p>
                    {props.prompt}
                </p>

                {/* Card Footer: hashtags */}
                <div className="card-actions">
                    {hashtags.map((tag, index) => (
                        <>
                            <div key={`${tag}-${index}`}
                                 className={"btn btn-xs normal-case badge text-xs shadow-md"}>
                                <p className={""}>
                                    {tag}
                                </p>
                            </div>
                        </>
                    ))}
                </div>
                {props.canEditCard && <div className="card-actions pt-2 justify-center">
                    <button onClick={handleEdit}
                            className="btn btn-sm btn-ghost text-xs font-medium bg-gradient-pink-lime text-white">
                        Edit
                    </button>
                    <button className="btn btn-sm text-xs font-medium text-white">
                        Delete
                    </button>
                </div>}
            </div>
        </article>
    );
};

export default Card;
