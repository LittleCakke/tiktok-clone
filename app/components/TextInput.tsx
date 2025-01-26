import React from "react";
import type { TextInputCompTypes } from "@/app/types";

export default function TextInput({
    string, inputType, placeholder, onUpdate, error
}: TextInputCompTypes)
{
    return (
        <>
            <input
                type={inputType}
                placeholder={placeholder}
                className="outline-none
                block
                w-full
                bg-[#F1F1F2]
                text-gray-800
                border
                border-gray-300
                rounded-md
                py-2.5
                px-3"
                value={string || ""}
                onChange={({ target }) => onUpdate(target.value)}
                autoComplete="off"
            />

            <div
                className="text-red-500 text-[14px] font-semibold">
                { error ? error : null }
            </div>
        </>
    );
}
