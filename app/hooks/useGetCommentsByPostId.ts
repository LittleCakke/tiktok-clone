import { database, Query } from "@/libs/AppWriteClient";
import useGetProfileByUserId from "@/app/hooks/useGetProfileByUserId";

const useGetCommentsByPostId = async (postId: string) =>
{
    try
    {
        let commentsResult = await database.listDocuments(
            `${process.env.NEXT_PUBLIC_DATABASE_ID}`,
            `${process.env.NEXT_PUBLIC_COLLECTION_ID_COMMENT}`,
            [
                Query.equal("post_id", postId),
                Query.orderDesc("$id")
            ]
        );

        let objPromises = commentsResult.documents.map(async comment =>
        {
            let profile = await useGetProfileByUserId(comment.user_id);

            return {
                id: comment?.$id,
                user_id: comment?.user_id,
                post_id: comment?.post_id,
                text: comment?.text,
                create_at: comment?.create_at,
                profile: {
                    user_id: profile?.user_id,
                    name: profile?.name,
                    image: profile?.image
                }
            }
        });

        return await Promise.all(objPromises);
    }
    catch (e)
    {
        throw e;
    }
}

export default useGetCommentsByPostId;
