import { database, storage, ID } from "@/libs/AppWriteClient";

const useCreatePost = async (file: File, userId: string, caption: string) =>
{
    let videoId = Math
        .random()
        .toString(36)
        .slice(2, 22);

    try
    {
        await database.createDocument(
            `${process.env.NEXT_PUBLIC_DATABASE_ID}`,
            `${process.env.NEXT_PUBLIC_COLLECTION_ID_POST}`,
            ID.unique(),
            {
                user_id: userId,
                text: caption,
                video_url: videoId,
                create_at: new Date().toISOString()
            }
        );

        await storage.createFile(
            `${process.env.NEXT_PUBLIC_BUCKET_ID}`,
            videoId,
            file
        );
    }
    catch (e)
    {
        throw e;
    }
}

export default useCreatePost;
