import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import useGetLikesByPostId from "@/app/hooks/useGetLikesByPostId";
import type { Like } from "@/app/types";

interface LikeStore
{
    likesByPost: Like[];
    setLikesByPost: (postId: string) => Promise<void>;
}

export const useLikeStore = create<LikeStore>()(
    devtools(
        persist(
            set => ({
                likesByPost: [],
                async setLikesByPost(postId: string)
                {
                    let result = await useGetLikesByPostId(postId);
                    set({ likesByPost: result });
                }
            }),
            {
                name: "store",
                storage: createJSONStorage(() => localStorage)
            }
        )
    )
);
