import { Like } from "@/app/types";

const useIsLiked = (userId: string, postId: string, likes: Like[]) =>
{
    let res: Like[] = [];
    likes?.forEach(like =>
    {
        if (like.user_id === userId && like.post_id === postId)
            res.push(like);
    });
    if (typeof res === "undefined") return;
    return res.length > 0;
}

export default useIsLiked;
