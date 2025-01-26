import React, { useState } from "react";
import Link from "next/link";
import { BiLoaderCircle } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";
import { useUser } from "@/app/context/user";
import { useCommentStore } from "@/app/stores/comment";
import useDeleteComment from "@/app/hooks/useDeleteComment";
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";
import moment from "moment";
import type { SingleCommentCompTypes } from "@/app/types";

export default function SingleComment({ comment, params }: SingleCommentCompTypes)
{
    const contextUser = useUser();

    let { setCommentsByPost } = useCommentStore();

    let [ isDeleting, setIsDeleting ] = useState(false);

    const deleteThisComment = async () =>
    {
        if (!window.confirm("Are you sure you want to delete this comment?"))
            return;

        try
        {
            setIsDeleting(true);
            await useDeleteComment(comment?.id);
            setCommentsByPost(params?.postId);
            setIsDeleting(false);
        }
        catch (e)
        {
            console.error(e);
            alert(e);
        }
    }

    return (
        <>
            <div
                id="SingleComment"
                className="flex
                items-center
                justify-between
                px-8
                mt-4">
                <div
                    className="flex items-center relative w-full">
                    <Link
                        href={`/profile/${comment.profile.user_id}`}>
                        <img
                            className="absolute
                            top-0
                            rounded-full
                            lg:mx-0
                            mx-auto"
                            width={40}
                            src={useCreateBucketUrl(comment.profile.image)}
                            alt="avatar"
                        />
                    </Link>

                    <div
                        className="ml-14 pt-0.5 w-full">
                        <div
                            className="text-[18px]
                            font-semibold
                            flex
                            items-center
                            justify-between">
                            <span
                                className="flex items-center">
                                { comment?.profile?.name } -
                                <span
                                    className="text-[12px]
                                    text-gray-600
                                    font-light
                                    ml-1">
                                    { moment(comment?.create_at).calendar() }
                                </span>
                            </span>
                            { contextUser?.user?.id === comment.profile.user_id && (
                                <button
                                    disabled={isDeleting}
                                    onClick={deleteThisComment}>
                                    { isDeleting ? (
                                        <BiLoaderCircle
                                            className="animate-spin text-[#E91E62]"
                                            size={20}
                                        />
                                    ) : (
                                        <BsTrash3
                                            className="cursor-pointer"
                                            size={25}
                                        />
                                    ) }
                                </button>
                            ) }
                        </div>

                        <p
                            className="text-[15px] font-light">
                            { comment.text }
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
