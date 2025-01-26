import { database, Query } from "@/libs/AppWriteClient";

const useGetProfileByUserId = async (userId: string) =>
{
    try
    {
        let response = await database.listDocuments(
            `${process.env.NEXT_PUBLIC_DATABASE_ID}`,
            `${process.env.NEXT_PUBLIC_COLLECTION_ID_PROFILE}`,
            [
                Query.equal("user_id", userId)
            ]
        );

        let documents = response.documents;
        console.info(documents[0]);

        return {
            id: documents[0]?.$id,
            user_id: documents[0]?.user_id,
            name: documents[0]?.name,
            image: documents[0]?.image,
            bio: documents[0]?.bio
        }
    }
    catch (e)
    {
        throw e;
    }
}

export default useGetProfileByUserId;
