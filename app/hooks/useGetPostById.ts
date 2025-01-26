import { database } from "@/libs/AppWriteClient";
import useGetProfileByUserId from "@/app/hooks/useGetProfileByUserId";

const useGetPostById = async (id: string) =>
{
    try
    {
        let post = await database.getDocument(
            `${process.env.NEXT_PUBLIC_DATABASE_ID}`,
            `${process.env.NEXT_PUBLIC_COLLECTION_ID_POST}`,
            id
        );

        let profile = await useGetProfileByUserId(post?.user_id);

        return {
            id: post?.$id,
            user_id: post?.user_id,
            video_url: post?.video_url,
            text: post?.text,
            create_at: post?.create_at,
            profile: {
                user_id: profile?.user_id,
                name: profile?.name,
                image: profile?.image
            }
        }
    }
    catch (e)
    {
        throw e;
    }
}

export default useGetPostById;
