import { database, Query } from "@/libs/AppWriteClient";

const useGetPostsByUser = async (userId: string) =>
{
    try
    {
        let response = await database.listDocuments(
            `${process.env.NEXT_PUBLIC_DATABASE_ID}`,
            `${process.env.NEXT_PUBLIC_COLLECTION_ID_POST}`,
            [
                Query.equal("user_id", userId),
                Query.orderDesc("$id")
            ]
        );

        let documents = response.documents;
        return documents.map(doc =>
        {
            return {
                id: doc?.$id,
                user_id: doc?.user_id,
                video_url: doc?.video_url,
                text: doc?.text,
                create_at: doc?.create_at
            }
        });
    }
    catch (e)
    {
        throw e;
    }
}

export default useGetPostsByUser;
