import React, { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Link from "next/link";
import { SiSoundcharts } from "react-icons/si";
import { BiErrorCircle } from "react-icons/bi";
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";
import type { PostUserCompTypes } from "@/app/types";

export default function PostUser({ post }: PostUserCompTypes)
{
    useEffect(() =>
    {
        const video = document.getElementById(`video-${post?.id}`) as HTMLVideoElement;

        setTimeout(() =>
        {
            video.addEventListener("mouseenter", () => { video.play() });
            video.addEventListener("mouseleave", () => { video.pause() });
        }, 50);
    }, []);

    const isUrlExist = () =>
    {
        if (!post.video_url)
        {
            return (
                <div
                    className="absolute
                    flex
                    items-center
                    justify-center
                    top-0
                    left-0
                    aspect-[3/4]
                    w-full
                    object-contain
                    rounded-md
                    bg-black">
                    <AiOutlineLoading3Quarters
                        className="animate-spin text-white"
                        size={80} />
                </div>
            );
        }
        else
        {
            return (
                <Link
                    href={`/post/${post.id}/${post.user_id}`}>
                    <video
                        id={`video-${post.id}`}
                        muted
                        loop
                        className="aspect-[3/4]
                        object-contain
                        h-[400px]
                        bg-black
                        rounded-md"
                        src={useCreateBucketUrl(post.video_url)} />
                </Link>
            );
        }
    }

    return (
        <>
            <div
                className="relative
                brightness-90
                hover:brightness-[1.1]
                duration-200
                cursor-pointer">
                { isUrlExist() }

                <div
                    className="px-1">
                    <p
                        className="text-gray-700
                        text-[15px]
                        pt-1
                        break-words">
                        { post.text }
                    </p>

                    <div
                        className="flex
                        items-center
                        gap-1
                        -ml-1
                        text-gray-600
                        font-bold
                        text-xs">
                        <SiSoundcharts
                            size={15} />
                        3%
                        <BiErrorCircle
                            size={16} />
                    </div>
                </div>
            </div>
        </>
    );
}
