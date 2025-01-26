import React, { useState } from "react";
import { PostPageTypes } from "@/app/types";
import ClientOnly from "@/app/components/ClientOnly";
import SingleComment from "@/app/components/post/SingleComment";
import { BiLoaderCircle } from "react-icons/bi";
import { useCommentStore } from "@/app/stores/comment";
import { useGeneralStore } from "@/app/stores/general";
import { useUser } from "@/app/context/user";
import useCreateComment from "@/app/hooks/useCreateComment";

export default function Comments({ params }: PostPageTypes)
{
    const contextUser = useUser();
    let { commentsByPost, setCommentsByPost } = useCommentStore();
    let { setIsLoginOpen } = useGeneralStore();

    let [ comment, setComment ] = useState("");
    let [ isUploading, setIsUploading ] = useState(false);

    const addComment = async () =>
    {
        if (!contextUser?.user) return setIsLoginOpen(true);

        try
        {
            setIsUploading(true);
            await useCreateComment(contextUser?.user?.id, params?.postId, comment);
            setCommentsByPost(params?.postId);
            setComment("");
            setIsUploading(false);
        }
        catch (e)
        {
            console.error(e);
            alert(e);
        }
    }

    const hasComments = () =>
    {
        if (commentsByPost.length == 0)
        {
            return (
                <div
                    className="text-center
                    mt-6
                    text-xl
                    text-gray-500">
                    No comments...
                </div>
            );
        }
        else
        {
            return (
                <div>
                    {
                        commentsByPost.map(
                            comment => (
                                <SingleComment
                                    key={comment.id}
                                    comment={comment}
                                    params={params}
                                />
                            )
                        )
                    }
                </div>
            );
        }
    }

    return (
        <>
            <div
                id={`Comments`}
                className="relative
                bg-[#F8F8F8]
                z-0
                w-full
                h-[calc(100%-273px)]
                border-t-2
                overflow-auto">
                <div
                    className="pt-2" />

                <ClientOnly>
                    { hasComments() }
                </ClientOnly>

                <div className="mb-28" />
            </div>

            <div
                id="CreateComment"
                className="absolute
                flex
                items-center
                justify-between
                bottom-0
                bg-white
                h-[85px]
                lg:max-w-[550px]
                w-full
                py-5
                px-8
                border-t-2">
                <div
                    className={`
                        bg-[#F1F1F2]
                        flex items-center
                        rounded-lg
                        w-full
                        lg:max-w-[420px]
                        border-2
                        border-[#F1F1F2]
                        focus-within:border-gray-400
                        duration-200
                    `}>
                    <input
                        className="bg-[#F1F1F2]
                        text-[14px]
                        outline-none
                        w-full
                        lg:max-w-[420px]
                        p-2
                        rounded-lg"
                        onChange={e=>setComment(e.target.value)}
                        value={comment}
                        type="text"
                        placeholder="Add a comment..."
                    />
                </div>

                { !isUploading ? (
                    <button
                        disabled={!comment}
                        onClick={addComment}
                        className={`
                            font-semibold
                            text-sm
                            ml-5
                            pr-1
                            duration-200
                            ${comment ? "text-[#F02C56]" : "text-gray-400"}
                        `}>
                        POST
                    </button>
                ) : (
                    <BiLoaderCircle
                        className="animate-spin text-[#E91E62]"
                        size={20}
                    />
                ) }
            </div>
        </>
    );
}
