import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface ISkeleton {
    canEditCard?: boolean;
}

const CardSkeleton = ({canEditCard}: ISkeleton) => {
    return (
        <article className={"space-y-5 w-full h-fit p-6 bg-neutral shadow-xl break-inside-avoid rounded-xl"}>
            {/* Card Header: avatar, username, email, icon */}
            <div className={"flex items-center"}>
                <Skeleton
                    circle={true}
                    width={40}
                    height={40}
                    baseColor={"#59515E"}
                    highlightColor={"#D3D3D3"}
                    className={"flex-1"}
                />

                <div className={"ml-3 flex-[30%]"}>
                    <Skeleton count={2} baseColor={"#59515E"} highlightColor={"#D3D3D3"}/>
                </div>

                <div className={"ml-3 flex-[70%] text-right"}>
                    <Skeleton
                        circle={true}
                        width={30}
                        height={30}
                        baseColor={"#59515E"}
                        highlightColor={"#D3D3D3"}
                    />
                </div>
            </div>

            {/* Card Body: prompt */}
            <div className={"w-full"}>
                <Skeleton count={5} baseColor={"#59515E"} highlightColor={"#D3D3D3"} height={10}/>
            </div>

            {/* Card Footer: hashtags */}
            <div className={"flex flex-1 space-x-4 "}>
                <Skeleton baseColor={"#59515E"} highlightColor={"#D3D3D3"} height={20} width={80}/>
                <Skeleton baseColor={"#59515E"} highlightColor={"#D3D3D3"} height={20} width={80}/>
            </div>

            {/* Card Footer: buttons */}
            {canEditCard &&
                <div className={"flex flex-1 space-x-4 justify-center"}>
                    <Skeleton baseColor={"#59515E"} highlightColor={"#D3D3D3"} height={10} width={50}/>
                    <Skeleton baseColor={"#59515E"} highlightColor={"#D3D3D3"} height={10} width={50}/>
                </div>
            }
        </article>
    );
};

export default CardSkeleton;
