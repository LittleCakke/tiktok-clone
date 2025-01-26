const useCreateBucketUrl = (fileId: string) =>
{
    let url = process.env.NEXT_PUBLIC_APPWRITE_URL;
    let id = process.env.NEXT_PUBLIC_BUCKET_ID;
    let endpoint = process.env.NEXT_PUBLIC_ENDPOINT;

    if (!url || !id || !endpoint || !fileId) return "";

    return `${url}/storage/buckets/${id}/files/${fileId}/view?project=${endpoint}`;
}

export default useCreateBucketUrl;
