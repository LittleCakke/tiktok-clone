"use client";

import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Register from "@/app/components/auth/Register";
import Login from "@/app/components/auth/Login";
import { useGeneralStore } from "@/app/stores/general";

export default function AuthOverlay()
{
    let { setIsLoginOpen } = useGeneralStore();

    let [ isRegister, setIsRegister ] = useState(false);

    return (
        <>
            <div
                id="AuthOverlay"
                className="fixed
                flex
                items-center
                justify-center
                z-50
                top-0
                left-0
                w-full
                h-full
                bg-black/50">
                <div
                    className="relative
                    bg-white
                    w-full
                    max-w-[470px]
                    h-[70%]
                    p-4
                    rounded-lg">
                    <div
                        className="w-full
                        flex
                        justify-end">
                        <button
                            onClick={() => setIsLoginOpen(false)}
                            className="p-1.5
                            rounded-full
                            bg-gray-100">
                            <AiOutlineClose size={26} />
                        </button>
                    </div>

                    { isRegister ? <Register /> : <Login /> }

                    <div
                        className="absolute
                        flex
                        items-center
                        justify-center
                        py-5
                        left-0
                        bottom-0
                        border-t
                        w-full">
                        <span
                            className="text-[14px] text-gray-600">
                            Don't have an account?
                            <button
                                className="text-[14px] text-[#F02C56] font-semibold pl-1"
                                onClick={() => setIsRegister(isRegister = !isRegister)}>
                                <span>
                                    { !isRegister ? "Register" : "Log in" }
                                </span>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
