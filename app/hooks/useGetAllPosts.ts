import { database, Query } from "@/libs/AppWriteClient";
import useGetProfileByUserId from "@/app/hooks/useGetProfileByUserId";

const useGetAllPosts = async () =>
{
    try
    {
        let response = await database.listDocuments(
            `${process.env.NEXT_PUBLIC_DATABASE_ID}`,
            `${process.env.NEXT_PUBLIC_COLLECTION_ID_POST}`,
            [
                Query.orderDesc("$id")
            ]
        );

        let { documents } = response;

        let result = documents.map(async doc =>
        {
            let profile = await useGetProfileByUserId(doc?.user_id);

            return {
                id: doc?.$id,
                user_id: doc?.user_id,
                video_url: doc?.video_url,
                text: doc?.text,
                create_at: doc?.create_at,
                profile: {
                    user_id: profile?.user_id,
                    name: profile?.name,
                    image: profile?.image
                }
            }
        });

        return await Promise.all(result);
    }
    catch (e)
    {
        throw e;
    }
}

export default useGetAllPosts;
