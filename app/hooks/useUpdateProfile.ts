import { database } from "@/libs/AppWriteClient";

const useUpdateProfile = async (id: string, name: string, bio: string) =>
{
    try
    {
        let response = await database.updateDocument(
            `${process.env.NEXT_PUBLIC_DATABASE_ID}`,
            `${process.env.NEXT_PUBLIC_COLLECTION_ID_PROFILE}`,
            id,
            { name, bio }
        );
    }
    catch (e)
    {
        throw e;
    }
}

export default useUpdateProfile;
