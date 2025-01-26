import { database, ID } from "@/libs/AppWriteClient";

const useCreateLike = async (userId: string, postId: string) =>
{
    try
    {
        await database.createDocument(
            `${process.env.NEXT_PUBLIC_DATABASE_ID}`,
            `${process.env.NEXT_PUBLIC_COLLECTION_ID_LIKE}`,
            ID.unique(),
            {
                user_id: userId,
                post_id: postId
            }
        )
    }
    catch (e)
    {
        throw e;
    }
}

export default useCreateLike;
