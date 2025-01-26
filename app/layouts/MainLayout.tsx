import React from "react";
import { usePathname } from "next/navigation";
import TopNav from "@/app/layouts/includes/TopNav";
import SideNavMain from "@/app/layouts/includes/SideNavMain";

export default function MainLayout({ children }: { children: React.ReactNode })
{
    let pathname = usePathname();
    return (
        <>
            <TopNav />
            <div
                className={`flex
                justify-between
                mx-auto
                w-full
                lg:px-2.5
                px-0
                ${pathname === "/" ? "max-w-[1140px]" : ""}`}
            >
                <SideNavMain />
                { children }
            </div>
        </>
    );
}
