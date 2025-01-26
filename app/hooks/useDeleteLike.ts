import { database } from "@/libs/AppWriteClient";

const useDeleteLike = async (id: string) =>
{
    try
    {
        await database.deleteDocument(
            `${process.env.NEXT_PUBLIC_DATABASE_ID}`,
            `${process.env.NEXT_PUBLIC_COLLECTION_ID_LIKE}`,
            id
        )
    }
    catch (e)
    {
        throw e;
    }
}

export default useDeleteLike;
