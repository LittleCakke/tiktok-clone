import React, { useEffect } from "react";
import Link from "next/link";
import { ImMusic } from "react-icons/im";
import { AiFillHeart } from "react-icons/ai";
import PostMainLikes from "@/app/components/PostMainLikes";
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";
import type { PostMainCompTypes } from "@/app/types";

export default function PostMain({ post }: PostMainCompTypes)
{
    useEffect(() =>
    {
        let video = document.getElementById(`video-${post?.id}`) as HTMLVideoElement;
        let postMainElement = document.getElementById(`PostMain-${post.id}`);

        if (postMainElement)
        {
            let observer = new IntersectionObserver((entries) =>
            {
                entries[0].isIntersecting ? video.play() : video.pause();
            }, { threshold: [0.6] });

            observer.observe(postMainElement);
        }
    }, []);

    return (
        <>
            <div
                id={`PostMain-${post.id}`}
                className="flex border-b py-6">
                <div
                    className="cursor-pointer">
                    <img
                        width={60}
                        className="rounded-full max-h-[60px]"
                        src={useCreateBucketUrl(post?.profile.image)}
                        alt="avatar" />
                </div>

                <div
                    className="pl-3 w-full px-4">
                    <div
                        className="flex items-center justify-between pb-0.5">
                        <Link
                            href={`/profile/${post.profile.user_id}`}>
                            <span
                                className="font-bold
                                duration-75
                                hover:underline
                                cursor-pointer">
                                { post.profile.name }
                            </span>
                        </Link>

                        <button
                            className="text-[15px]
                            px-[21px]
                            py-0.5
                            border
                            border-[#F02C56]
                            text-[#F02C56]
                            duration-200
                            hover:bg-[#FFEEF2]
                            font-semibold
                            rounded-md">
                            Follow
                        </button>
                    </div>

                    <p
                        className="text-[15px]
                        pb-0.5
                        break-words
                        md:max-w-[400px]
                        max-w-[300px]">
                        { post.text }
                    </p>

                    <p
                        className="text-[14px]
                        text-gray-500
                        pb-0.5">
                        #fun #cool #SuperAwesome
                    </p>

                    <p
                        className="text-[14px]
                        pb-0.5
                        flex
                        items-center
                        font-semibold">
                        <ImMusic
                            size={17} />
                        <span
                            className="px-1">
                            original sound - AWESOME
                        </span>
                        <AiFillHeart
                            size={20} />
                    </p>

                    <div
                        className="mt-2.5 flex">
                        <div
                            className="relative
                            min-h-[500px]
                            max-w-[260px]
                            flex
                            items-center
                            bg-black
                            rounded-xl
                            cursor-pointer">
                            <video
                                id={`video-${post.id}`}
                                className="rounded-xl
                                object-contain
                                mx-auto
                                h-full"
                                src={useCreateBucketUrl(post?.video_url)}
                                loop
                                controls
                                muted />

                            <img
                                className="absolute right-2 bottom-10"
                                width={90}
                                alt="logo"
                                src="/images/tiktok-logo-white.png" />
                        </div>

                        <PostMainLikes post={post} />
                    </div>
                </div>
            </div>
        </>
    );
}
