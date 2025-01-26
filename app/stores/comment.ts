import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import useGetCommentsByPostId from "@/app/hooks/useGetCommentsByPostId";
import type { CommentWithProfile } from "@/app/types";

interface CommentStore
{
    commentsByPost: CommentWithProfile[];
    setCommentsByPost: (postId: string) => Promise<void>;
}

export const useCommentStore = create<CommentStore>()(
    devtools(
        persist(
            set => ({
                commentsByPost: [],

                async setCommentsByPost(postId: string)
                {
                    let result = await useGetCommentsByPostId(postId);
                    set({ commentsByPost: result });
                }
            }),
            {
                name: "store",
                storage: createJSONStorage(() => localStorage)
            }
        )
    )
);
