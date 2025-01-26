import { database, Query } from "@/libs/AppWriteClient";

const useGetLikesByPostId = async (postId: string) =>
{
    try
    {
        let response = await database.listDocuments(
            `${process.env.NEXT_PUBLIC_DATABASE_ID}`,
            `${process.env.NEXT_PUBLIC_COLLECTION_ID_LIKE}`,
            [
                Query.equal("post_id", postId)
            ]
        );

        let documents = response.documents;
        return documents.map(doc =>
        {
            return {
                id: doc?.$id,
                user_id: doc?.user_id,
                post_id: doc?.post_id
            }
        });
    }
    catch (e)
    {
        throw e;
    }
}

export default useGetLikesByPostId;
