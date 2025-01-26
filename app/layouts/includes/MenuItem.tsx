"use client";

import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { RiGroupLine } from "react-icons/ri";
import { BsCameraVideo } from "react-icons/bs";
import type { MenuItemsTypes } from "@/app/types";

export default function MenuItem({ icon, color, size = 25 }: MenuItemsTypes)
{
    const icons = () =>
    {
        if (icon === "For You")
            return <AiOutlineHome
                size={size}
                color={color} />
        if (icon === "Following")
            return <RiGroupLine
                size={size}
                color={color} />
        if (icon === "LIVE")
            return <BsCameraVideo
                size={size}
                color={color} />
    }

    return (
        <>
            <div
                className="w-full
                flex
                items-center
                hover:bg-gray-100
                p-2.5
                rounded-md">
                <div
                    className="flex items-center lg:mx-0 mx-auto">
                    { icons() }

                    <p
                        className={`lg:block
                        hidden
                        pl-[9px]
                        mt-0.5
                        font-semibold
                        text-[17px]
                        text-[${color}]`}>
                        { icon }
                    </p>
                </div>
            </div>
        </>
    );
}
