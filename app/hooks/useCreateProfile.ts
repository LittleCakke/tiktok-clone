import { database, ID } from "@/libs/AppWriteClient";

const useCreateProfile = async (userId: string, name: string, image: string, bio: string) =>
{
    try
    {
        await database.createDocument(
            `${process.env.NEXT_PUBLIC_DATABASE_ID}`,
            `${process.env.NEXT_PUBLIC_COLLECTION_ID_PROFILE}`,
            ID.unique(),
            {
                user_id: userId,
                name,
                image,
                bio
            }
        )
    }
    catch (e)
    {
        throw e;
    }
}

export default useCreateProfile;
