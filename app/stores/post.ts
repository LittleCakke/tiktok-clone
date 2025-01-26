import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import useGetAllPosts from "@/app/hooks/useGetAllPosts";
import useGetPostsByUser from "@/app/hooks/useGetPostsByUser";
import useGetPostById from "@/app/hooks/useGetPostById";
import type { Post, PostWithProfile } from "@/app/types";

interface PostStore
{
    allPosts: PostWithProfile[];
    postsByUser: Post[];
    postById: PostWithProfile | null;
    setAllPosts: () => void;
    setPostsByUser: (userId: string) => void;
    setPostById: (postId: string) => void;
}

export const usePostStore = create<PostStore>()(
    devtools(
        persist(
            set => ({
                allPosts: [],
                postsByUser: [],
                postById: null,

                async setAllPosts()
                {
                    let result = await useGetAllPosts();
                    set({ allPosts: result });
                },

                async setPostsByUser(userId: string)
                {
                    let result = await useGetPostsByUser(userId);
                    set({ postsByUser: result });
                },

                async setPostById(postId: string)
                {
                    let result = await useGetPostById(postId);
                    set({ postById: result });
                }
            }),
            {
                name: "store",
                storage: createJSONStorage(() => localStorage)
            }
        )
    )
);
