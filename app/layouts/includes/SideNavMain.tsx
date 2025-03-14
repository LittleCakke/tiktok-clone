import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import MenuItem from "@/app/layouts/includes/MenuItem";
import ClientOnly from "@/app/components/ClientOnly";
import MenuItemFollow from "@/app/layouts/includes/MenuItemFollow";
import { useGeneralStore } from "@/app/stores/general";
import { useUser } from "@/app/context/user";

export default function SideNavMain({ children }: { children: React.ReactNode })
{
    const pathname = usePathname();
    const contextUser = useUser();

    let { randomUsers, setRandomUsers } = useGeneralStore();

    const isLogged = (logged: boolean) =>
    {
        if (logged)
        {
            return (
                <div>
                    <div
                        className="border-b lg:ml-2 mt-2"/>
                    <h3
                        className="lg:block
                        hidden
                        text-xs
                        text-gray-600
                        font-semibold
                        pt-4
                        pb-2
                        px-2">
                        Following accounts
                    </h3>

                    <div
                        className="lg:hidden block pt-3"/>

                    <ClientOnly>
                        <div
                            className="cursor-pointer">
                            { randomUsers.map(user => (
                                <MenuItemFollow
                                    user={user}
                                    key={user.id}
                                />
                            )) }
                        </div>
                    </ClientOnly>

                    <button
                        className="lg:block
                        hidden
                        text-[#F02C56]
                        pt-1.5
                        pl-2
                        text-[13px]">
                        See more
                    </button>
                </div>
            );
        }
        return null;
    }

    useEffect(() =>
    {
        setRandomUsers();
    }, []);

    return (
        <>
            <div
                id="SideNavMain"
                className={`fixed
                bg-white
                pt-[70px]
                h-full
                lg:border-r-0
                border-r
                w-[75px]
                overflow-auto
                ${pathname === "/" ? "lg:w-[310px]" : "lg:w-[220px]"}`}>
                <div
                    className="lg:w-full w-[55px] mx-auto">
                    <Link
                        href="/">
                        <MenuItem
                            icon="For You"
                            color={pathname === "/" ? "#F02C56" : ""}/>
                    </Link>

                    <MenuItem
                        icon="Following"
                        color="black"/>

                    <MenuItem
                        icon="LIVE"
                        color="black"/>

                    <div
                        className="border-b lg:ml-2 mt-2"/>
                    <h3
                        className="lg:block
                        hidden
                        text-xs
                        text-gray-600
                        font-semibold
                        pt-4
                        pb-2
                        px-2">
                        Suggested accounts
                    </h3>

                    <div
                        className="lg:hidden block pt-3"/>

                    <ClientOnly>
                        <div
                            className="cursor-pointer">
                            { randomUsers.map(user => (
                                <MenuItemFollow
                                    user={user}
                                    key={user.id}
                                />
                            )) }
                        </div>
                    </ClientOnly>

                    <button
                        className="lg:block
                        hidden
                        text-[#F02C56]
                        pt-1.5
                        pl-2
                        text-[13px]">
                        See all
                    </button>

                    { isLogged(!!contextUser?.user?.id) }

                    <div
                        className="lg:block hidden border-b lg:ml-2 mt-2" />

                    <div
                        className="lg:block
                        hidden
                        text-[11px]
                        text-gray-500">
                        <p
                            className="pt-4 px-2">
                            About Newsroom TikTok Shop Contact Careers ByteDance
                        </p>
                        <p
                            className="pt-4 px-2">
                            TikTok for Good Advertise Developers Transparency TikTok Rewards TikTok Browse TikTok Embeds
                        </p>
                        <p
                            className="pt-4 px-2">
                            Help Safety Terms Privacy Creator Portal Community Guidelines
                        </p>
                        <p
                            className="pt-4 px-2">
                            &copy; 2023 TikTok
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
