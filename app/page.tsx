"use client";

import MainLayout from "@/app/layouts/MainLayout";
import ClientOnly from "@/app/components/ClientOnly";
import PostMain from "@/app/components/PostMain";
import { usePostStore } from "@/app/stores/post";
import { useEffect } from "react";

export default function Home()
{
    let { allPosts, setAllPosts } = usePostStore();

    useEffect(() =>
    {
        setAllPosts();
    }, []);

    return (
        <>
            <MainLayout>
                <div
                    className="mt-[80px]
                    w-[calc(100%-90px)]
                    max-w-[690px]
                    ml-auto">
                    <ClientOnly>
                        { allPosts.map(post => (
                            <PostMain
                                post={post}
                                key={post.id}
                            />
                        ))}
                    </ClientOnly>
                </div>
            </MainLayout>
        </>
    );
}
