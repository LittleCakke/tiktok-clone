import { database, Query } from "@/libs/AppWriteClient";

const useSearchProfilesByName = async (name: string) =>
{
    try
    {
        let response = await database.listDocuments(
            `${process.env.NEXT_PUBLIC_DATABASE_ID}`,
            `${process.env.NEXT_PUBLIC_COLLECTION_ID_PROFILE}`,
            [
                Query.limit(5),
                Query.search("name", name)
            ]
        );

        let { documents } = response;
        let result = documents.map(profile =>
        {
            return {
                id: profile?.user_id,
                name: profile?.name,
                image: profile?.image
            }
        });

        return await Promise.all(result);
    }
    catch (e)
    {
        throw e;
    }
}

export default useSearchProfilesByName;
