"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import ClientOnly from "@/app/components/ClientOnly";
import CommentHeader from "@/app/components/post/CommentHeader";
import Comments from "@/app/components/post/Comments";
import { usePostStore } from "@/app/stores/post";
import { useLikeStore } from "@/app/stores/like";
import { useCommentStore } from "@/app/stores/comment";
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";
import type { PostPageTypes } from "@/app/types";

export default function Post({ params }: PostPageTypes)
{
    const router = useRouter();

    let {
        postById, postsByUser, setPostById, setPostsByUser
    } = usePostStore();
    let { setLikesByPost } = useLikeStore();
    let { setCommentsByPost } = useCommentStore();

    const loopThroughPostsUp = () =>
    {
        postsByUser.forEach(post =>
        {
            if (post.id > params.postId)
                router.push(`/post/${post.id}/${params.userId}`);
        });
    }

    const loopThroughPostsDown = () =>
    {
        postsByUser.forEach(post =>
        {
            if (post.id < params.postId)
                router.push(`/post/${post.id}/${params.userId}`);
        });
    }

    const hasVideoToSetCover = (b: boolean) =>
    {
        if (b)
        {
            return (
                <video
                    className="fixed
                    object-contain
                    w-full
                    my-auto
                    z-[0]
                    h-screen"
                    src={useCreateBucketUrl(postById?.video_url || "")}
                />
            );
        }
        else
        {
            return null;
        }
    }

    const hasVideo = (b: boolean) =>
    {
        if (b)
        {
            return (
                <video
                    autoPlay
                    controls
                    loop
                    muted
                    className="h-screen mx-auto"
                    src={useCreateBucketUrl(postById?.video_url || "")}
                />
            );
        }
        return null;
    }

    const showCommentHeader = (b: boolean) =>
    {
        return b ? (
            <CommentHeader
                params={params}
                post={postById}
            />
        ) : null;
    }

    useEffect(() =>
    {
        setPostById(params.postId);
        setCommentsByPost(params.postId);
        setLikesByPost(params.postId);
        setPostsByUser(params.userId);
    }, []);

    return (
        <>
            <div
                id="PostPage"
                className="lg:flex
                justify-between
                w-full
                h-screen
                bg-black
                overflow-auto">
                <div
                    className="lg:w-[calc(100%-540px)]
                    h-full
                    relative">
                    <Link
                        href={`/profile/${params?.userId}`}
                        className="absolute
                        text-white
                        z-20
                        m-5
                        rounded-full
                        bg-gray-700
                        p-1.5
                        hover:bg-gray-800
                        duration-200">
                        <AiOutlineClose
                            size={27} />
                    </Link>

                    <div>
                        <button
                            className="absolute
                            z-20
                            right-4
                            top-4
                            flex
                            items-center
                            justify-center
                            rounded-full
                            bg-gray-700
                            hover:bg-gray-800
                            duration-200
                            p-1.5"
                            onClick={() => loopThroughPostsUp()}>
                            <BiChevronUp
                                size={30}
                                className="text-white" />
                        </button>

                        <button
                            className="absolute
                            z-20
                            right-4
                            top-20
                            flex
                            items-center
                            justify-center
                            rounded-full
                            bg-gray-700
                            hover:bg-gray-800
                            duration-200
                            p-1.5"
                            onClick={() => loopThroughPostsDown()}>
                            <BiChevronDown
                                size={30}
                                className="text-white" />
                        </button>
                    </div>

                    <img
                        width={45}
                        src="/images/tiktok-logo-small.png"
                        alt="logo"
                        className="absolute
                        z-20
                        top-[18px]
                        left-[70px]
                        rounded-full
                        lg:mx-0
                        mx-auto"
                    />

                    <ClientOnly>
                        { hasVideoToSetCover(!!postById?.video_url) }

                        <div
                            className="bg-black/70
                            lg:min-w-[480px]
                            z-10
                            relative">
                            { hasVideo(!!postById?.video_url) }
                        </div>
                    </ClientOnly>
                </div>

                <div
                    id="InfoSection"
                    className="lg:max-w-[550px]
                    relative
                    w-full
                    h-full
                    bg-white">
                    <div className="py-7" />

                    <ClientOnly>
                        { showCommentHeader(!!postById?.video_url) }
                    </ClientOnly>

                    <Comments
                        params={params}
                    />
                </div>
            </div>
        </>
    );
}
