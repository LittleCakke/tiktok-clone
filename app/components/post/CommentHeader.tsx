"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BiLoaderCircle } from "react-icons/bi";
import { BsChatDots, BsTrash3 } from "react-icons/bs";
import { ImMusic } from "react-icons/im";
import ClientOnly from "@/app/components/ClientOnly";
import { AiFillHeart } from "react-icons/ai";
import { useLikeStore } from "@/app/stores/like";
import { useCommentStore } from "@/app/stores/comment";
import { useGeneralStore } from "@/app/stores/general";
import { useUser } from "@/app/context/user";
import useIsLiked from "@/app/hooks/useIsLiked";
import useCreateLike from "@/app/hooks/useCreateLike";
import useDeleteLike from "@/app/hooks/useDeleteLike";
import useDeletePostById from "@/app/hooks/useDeletePostById";
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";
import moment from "moment";
import type { CommentsHeaderCompTypes } from "@/app/types";

export default function CommentHeader({ post, params }: CommentsHeaderCompTypes)
{
    const router = useRouter();
    const contextUser = useUser();

    let { setLikesByPost, likesByPost } = useLikeStore();
    let { commentsByPost, setCommentsByPost } = useCommentStore();
    let { setIsLoginOpen } = useGeneralStore();

    let [ hasClickedLike, setHasClickedLike ] = useState(false);
    let [ isDeleting, setIsDeleting ] = useState(false);
    let [ userLiked, setUserLiked ] = useState(false);

    const deletePost = async () =>
    {
        let res = window.confirm("Are you sure you want to delete this post?");

        if (!res) return;

        setIsDeleting(true);

        try
        {
            await useDeletePostById(params?.postId, post?.video_url);
            router.push(`/profile/${params.userId}`);
            setIsDeleting(false);
        }
        catch (e)
        {
            console.error(e);
            setIsDeleting(false);
            alert(e);
        }
    }

    const hasUserLikedPost = () =>
    {
        if (likesByPost.length === 0 || !contextUser?.user?.id)
        {
            setUserLiked(false);
            return;
        }
        let res = useIsLiked(contextUser.user.id, params.postId, likesByPost);
        setUserLiked(!!res)
    }

    const like = async () =>
    {
        try
        {
            setHasClickedLike(true);
            await useCreateLike(contextUser?.user?.id || "", params.postId);
            setLikesByPost(params.postId);
            setHasClickedLike(false);
        }
        catch (e)
        {
            console.error(e);
            alert(e);
            setHasClickedLike(false);
        }
    }

    const unlike = async (id: string) =>
    {
        try
        {
            setHasClickedLike(true);
            await useDeleteLike(id);
            setLikesByPost(params.postId);
            setHasClickedLike(false);
        }
        catch (e)
        {
            console.error(e);
            alert(e);
            setHasClickedLike(false);
        }
    }

    const likeOrUnlike = async () =>
    {
        if (!contextUser?.user) return setIsLoginOpen(true);

        let res = useIsLiked(contextUser.user.id, params.postId, likesByPost);

        if (!res)
            await like();
        else
        {
            for (const like1 of likesByPost)
            {
                if (contextUser?.user?.id && contextUser.user.id === like1.user_id && like1.post_id === params.postId)
                    await unlike(like1.id);
            }
        }
    }

    const hasUserAvatar = () =>
    {
        if (post?.profile.image)
        {
            return (
                <img
                    className="rounded-full lg:mx-0 mx-auto"
                    width={40}
                    src={useCreateBucketUrl(post?.profile.image)}
                    alt="avatar"
                />
            );
        }
        else
        {
            return (
                <div
                    className="w-[40px]
                    h-[40px]
                    bg-gray-200
                    rounded-full"
                />
            );
        }
    }

    const isRemoveOperating = () =>
    {
        if (isDeleting)
        {
            return (
                <BiLoaderCircle
                    className="animate-spin"
                    size={25}
                />
            );
        }
        else
        {
            return (
                <button
                    disabled={isDeleting}
                    onClick={() => deletePost()}
                >
                    <BsTrash3
                        className="cursor-pointer
                        text-gray-600
                        hover:text-[#F02C56]
                        duration-200"
                        size={25}
                    />
                </button>
            );
        }
    }

    const isLikedOperating = () =>
    {
        if (!hasClickedLike)
        {
            return (
                <AiFillHeart
                    className={likesByPost.length > 0 && userLiked ? "text-[#FF2626]" : ""}
                    size={25}
                />
            );
        }
        return (
            <BiLoaderCircle
                className="animate-spin"
                size={25}
            />
        );
    }

    useEffect(() =>
    {
        setCommentsByPost(params?.postId);
        setLikesByPost(params?.postId);
    }, [ post ]);

    useEffect(() =>
    {
        hasUserLikedPost();
    }, [ likesByPost ]);

    return (
        <>
            <div
                className="flex
                items-center
                justify-between
                px-8">
                <div
                    className="flex items-center">
                    <Link
                        href={`/profile/${post?.user_id}`}>
                        { hasUserAvatar() }
                    </Link>

                    <div
                        className="ml-3 pt-0.5">
                        <Link
                            className="relative
                            z-10
                            text-[17px]
                            font-semibold
                            hover:underline"
                            href={`/profile/${post?.user_id}`}>
                            { post?.profile.name }
                        </Link>

                        <div
                            className="relative
                            z-0
                            text-[13px]
                            -mt-5
                            font-light">
                            { post?.profile.name }

                            <span
                                className="relative
                                -top-0.5
                                text-[30px]
                                pl-1
                                pr-0.5">
                                .
                            </span>

                            <span
                                className="font-medium">
                                { moment(post?.create_at).calendar() }
                            </span>
                        </div>
                    </div>
                </div>

                { contextUser?.user?.id === post?.user_id && (
                    <div>
                        { isRemoveOperating() }
                    </div>
                ) }
            </div>

            <p
                className="px-8 mt-4 text-sm">
                { post?.text }
            </p>

            <p
                className="flex
                items-center
                gap-2
                px-8
                mt-4
                text-sm
                font-bold">
                <ImMusic
                    size={17}
                />
                original sound - { post?.profile.name }
            </p>

            <div
                className="flex items-center px-8 mt-8">
                <ClientOnly>
                    <div
                        className="pb-4
                        text-center
                        flex
                        items-center">
                        <button
                            disabled={hasClickedLike}
                            onClick={() => likeOrUnlike()}
                            className="rounded-full
                            bg-gray-200
                            p-2
                            cursor-pointer">
                            { isLikedOperating() }
                        </button>

                        <span
                            className="text-xs
                            pl-2
                            pr-4
                            text-gray-800
                            font-semibold">
                            { likesByPost.length }
                        </span>
                    </div>
                </ClientOnly>

                <div
                    className="pb-4 text-center flex items-center">
                    <div
                        className="rounded-full
                        bg-gray-200
                        p-2
                        cursor-pointer">
                        <BsChatDots
                            size={25}
                        />
                    </div>

                    <span
                        className="text-xs
                        pl-2
                        text-gray-800
                        font-semibold">
                        { commentsByPost?.length }
                    </span>
                </div>
            </div>
        </>
    );
}
