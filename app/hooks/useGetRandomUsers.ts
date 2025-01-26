import { database, Query } from "@/libs/AppWriteClient";

const useGetRandomUsers = async () =>
{
    try
    {
        let profileResult = await database.listDocuments(
            `${process.env.NEXT_PUBLIC_DATABASE_ID}`,
            `${process.env.NEXT_PUBLIC_COLLECTION_ID_PROFILE}`,
            [
                Query.limit(5)
            ]
        );

        let documents = profileResult.documents;

        const objPromises = documents.map(profile =>
        {
            return {
                id: profile?.user_id,
                name: profile?.name,
                image: profile?.image
            }
        });

        return await Promise.all(objPromises);
    }
    catch (e)
    {
        throw e;
    }
}

export default useGetRandomUsers;
