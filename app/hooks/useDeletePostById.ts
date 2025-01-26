import { database, storage } from "@/libs/AppWriteClient";
import useGetLikesByPostId from "@/app/hooks/useGetLikesByPostId";
import useDeleteLike from "@/app/hooks/useDeleteLike";
import useGetCommentsByPostId from "@/app/hooks/useGetCommentsByPostId";
import useDeleteComment from "@/app/hooks/useDeleteComment";

const useDeletePostById = async (postId: string, currentImage: string) =>
{
    try
    {
        let likes = await useGetLikesByPostId(postId);
        likes.forEach(async like => { await useDeleteLike(like?.id) });

        let comments = await useGetCommentsByPostId(postId);
        comments.forEach(async comment => { await useDeleteComment(comment?.id) });

        await database.deleteDocument(
            `${process.env.NEXT_PUBLIC_DATABASE_ID}`,
            `${process.env.NEXT_PUBLIC_COLLECTION_ID_POST}`,
            postId
        );

        await storage.deleteFile(
            `${process.env.NEXT_PUBLIC_BUCKET_ID}`,
            currentImage
        );
    }
    catch (e)
    {
        throw e;
    }
}

export default useDeletePostById;
