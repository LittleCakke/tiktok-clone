import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { FaCommentDots, FaShare } from "react-icons/fa";
import { useGeneralStore } from "@/app/stores/general";
import { useUser } from "@/app/context/user";
import type { PostMainLikesCompTypes, Like, Comment } from "@/app/types";
import useGetCommentsByPostId from "@/app/hooks/useGetCommentsByPostId";
import useGetLikesByPostId from "@/app/hooks/useGetLikesByPostId";
import useIsLiked from "@/app/hooks/useIsLiked";
import useCreateLike from "@/app/hooks/useCreateLike";
import useDeleteLike from "@/app/hooks/useDeleteLike";

export default function PostMainLikes({ post }: PostMainLikesCompTypes)
{
    const router = useRouter();
    const contextUser = useUser();

    let { setIsLoginOpen } = useGeneralStore();

    let [ hasClickedLike, setHasClickedLike ] = useState(false);
    let [ userLike, setUserLike ] = useState(false);
    let [ likes, setLikes ] = useState<Like[]>([]);
    let [ comments, setComments ] = useState<Comment[]>([]);

    const getAllLikesByPost = async () =>
    {
        let result = await useGetLikesByPostId(post?.id);
        setLikes(result);
    }

    const getAllCommentsByPost = async () =>
    {
        let result = await useGetCommentsByPostId(post?.id);
        setComments(result);
    }

    const hasUserLikedPost = () =>
    {
        if (!contextUser) return;

        if (likes?.length == 0 || !contextUser?.user?.id)
        {
            setUserLike(false);
            return;
        }

        let res = useIsLiked(contextUser?.user?.id, post?.id, likes);
        setUserLike(!!res);
    }

    const like = async () =>
    {
        try
        {
            setHasClickedLike(true);
            await useCreateLike(contextUser?.user?.id || "", post?.id);
            await getAllLikesByPost();
            hasUserLikedPost();
            setHasClickedLike(false);
        }
        catch (e)
        {
            window.alert(e);
        }
    }

    const unlike = async (id: string) =>
    {
        try
        {
            setHasClickedLike(true);
            await useDeleteLike(id);
            await getAllLikesByPost();
            hasUserLikedPost();
            setHasClickedLike(false);
        }
        catch (e)
        {
            window.alert(e);
        }
    }

    const likeOrUnlike = async () =>
    {
        if (!contextUser?.user) return setIsLoginOpen(true);

        let res = useIsLiked(contextUser.user.id, post?.id, likes);

        if (!res)
            await like();
        else
        {
            for (const like1 of likes)
            {
                if (contextUser?.user?.id && contextUser.user.id === like1.user_id && like1.post_id === post?.id)
                    await unlike(like1.id);
            }
        }
    }

    const isLoading = (loading: boolean) =>
    {
        if (loading)
        {
            return (
                <AiFillHeart
                    color={likes?.length > 0 && userLike ? "#FF2626" : ""}
                    size={25} />
            );
        }
        else
        {
            return (
                <BiLoaderCircle
                    className="animate-spin"
                    size={25} />
            );
        }
    }

    useEffect(() =>
    {
        getAllLikesByPost();
        getAllCommentsByPost();
    }, [ post ]);

    useEffect(() =>
    {
        hasUserLikedPost();
    }, [ likes, contextUser ]);

    return (
        <>
            <div
                id={`PostMainLikes-${post?.id}`}
                className="relative mr-[75px]">
                <div
                    className="absolute bottom-0 pl-2">
                    <div
                        className="pb-4 text-center">
                        <button
                            disabled={hasClickedLike}
                            onClick={likeOrUnlike}
                            className="rounded-full
                            bg-gray-200
                            p-2
                            cursor-pointer">
                            {isLoading(!hasClickedLike)}
                        </button>

                        <span
                            className="text-xs
                            text-gray-800
                            font-semibold">
                            {likes?.length}
                        </span>
                    </div>

                    <button
                        onClick={() => router.push(`/post/${post?.id}/${post?.profile?.user_id}`)}
                        className="pb-4 text-center">
                        <div
                            className="rounded-full
                            bg-gray-200
                            p-2
                            cursor-pointer">
                            <FaCommentDots
                                size={25}/>
                        </div>

                        <span
                            className="text-xs
                            text-gray-800
                            font-semibold">
                            {comments?.length}
                        </span>
                    </button>

                    <button
                        className="text-center">
                        <div
                            className="rounded-full
                            bg-gray-200
                            p-2
                            cursor-pointer">
                            <FaShare
                                size={25}/>
                        </div>

                        <span
                            className="text-xs
                            text-gray-800
                            font-semibold">
                            55
                        </span>
                    </button>
                </div>
            </div>
        </>
    );
}
