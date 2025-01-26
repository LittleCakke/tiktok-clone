import { database } from "@/libs/AppWriteClient";

const useUpdateProfileImage = async (id: string, image: string) =>
{
    try
    {
        await database.updateDocument(
            `${process.env.NEXT_PUBLIC_DATABASE_ID}`,
            `${process.env.NEXT_PUBLIC_COLLECTION_ID_PROFILE}`,
            id,
            { image }
        );
    }
    catch (e)
    {
        throw e;
    }
}

export default useUpdateProfileImage;
