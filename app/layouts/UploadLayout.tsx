import React from "react";
import TopNav from "@/app/layouts/includes/TopNav";

export default function UploadLayout({ children }: { children: React.ReactNode })
{
    return (
        <>
            <div
                className="bg-[#F8F8F8] h-screen">
                <TopNav />

                <div
                    className="flex
                    justify-between
                    mx-auto
                    w-full
                    px-2
                    max-w-[1140px]">
                    { children }
                </div>
            </div>
        </>
    );
}
