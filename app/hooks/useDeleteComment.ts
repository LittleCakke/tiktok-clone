import { database } from "@/libs/AppWriteClient";

const useDeleteComment = async (id: string) =>
{
    try
    {
        await database.deleteDocument(
            `${process.env.NEXT_PUBLIC_DATABASE_ID}`,
            `${process.env.NEXT_PUBLIC_COLLECTION_ID_COMMENT}`,
            id
        )
    }
    catch (e)
    {
        throw e;
    }
}

export default useDeleteComment;
