import React, { useState } from "react";
import TextInput from "@/app/components/TextInput";
import { BiLoaderCircle } from "react-icons/bi";
import { useUser } from "@/app/context/user";
import type { ShowErrorObject } from "@/app/types";
import { useGeneralStore } from "@/app/stores/general";

export default function Login()
{
    let { setIsLoginOpen } = useGeneralStore();

    let contextUser = useUser()

    let [ loading, setLoading ] = useState(false);
    let [ email, setEmail ] = useState("");
    let [ password, setPassword ] = useState("");
    let [ error, setError ] = useState<ShowErrorObject | null>(null);

    const showError = (type: string) =>
    {
        if (error && Object.entries(error).length > 0 && error?.type === type)
            return error.message;
        return "";
    }

    const validate = () =>
    {
        setError(null);
        let isError = false;

        if (!email)
        {
            setError({
                type: "email",
                message: "An email is required"
            });
            isError = true;
        }
        else if (!password)
        {
            setError({
                type: "password",
                message: "A password is required"
            });
            isError = true;
        }
        return isError;
    }

    const login = async () =>
    {
        if (validate()) return;
        if (!contextUser) return;

        try
        {
            setLoading(true);
            await contextUser.login(email, password);
            setLoading(false);
            setIsLoginOpen(false);
        }
        catch (e)
        {
            console.error(e);
            setLoading(false);
            alert(e);
        }
    }

    return (
        <>
            <div>
                <h1
                    className="text-center text-[28px] mb-4 font-bold">
                    Log in
                </h1>

                <div
                    className="px-6 pb-2">
                    <TextInput
                        string={email}
                        inputType={"email"}
                        placeholder={"Email"}
                        onUpdate={setEmail}
                        error={showError("email")}
                    />
                </div>

                <div
                    className="px-6 pb-2">
                    <TextInput
                        string={password}
                        inputType={"password"}
                        placeholder={"Password"}
                        onUpdate={setPassword}
                        error={showError("password")}
                    />
                </div>

                <div
                    className="px-6
                    pb-2
                    mt-6">
                    <button
                        className={`
                            flex
                            items-center
                            justify-center
                            w-full
                            text-[17px]
                            font-semibold
                            text-white
                            py-3
                            rounded-sm
                            ${!email || !password ? "bg-gray-200" : "bg-[#F02C56]"}
                        `}
                        disabled={loading}
                        onClick={login}>
                        { loading ? (
                            <BiLoaderCircle
                                className="animate-spin text-white"
                                size={25}
                            />
                        ) : "Log in" }
                    </button>
                </div>
            </div>
        </>
    );
}

