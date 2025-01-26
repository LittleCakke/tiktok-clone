import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TextInput from "@/app/components/TextInput";
import { BiLoaderCircle } from "react-icons/bi";
import { useUser } from "@/app/context/user";
import type { ShowErrorObject } from "@/app/types";
import { useGeneralStore } from "@/app/stores/general";

export default function Register()
{
    const contextUser = useUser();

    let { setIsLoginOpen } = useGeneralStore();

    let router = useRouter();

    let [ loading, setLoading ] = useState(false);
    let [ name, setName ] = useState("");
    let [ email, setEmail ] = useState("");
    let [ password, setPassword ] = useState("");
    let [ confirmPassword, setConfirmPassword ] = useState("");
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

        let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
        if (!name)
        {
            setError({
                type: "name",
                message: "A name is required"
            });
            isError = true;
        }
        else if (!email)
        {
            setError({
                type: "email",
                message: "An email is required"
            });
            isError = true;
        }
        else if (!reg.test(email))
        {
            setError({
                type: "email",
                message: "The email is not valid"
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
        else if (password != confirmPassword)
        {
            setError({
                type: "password",
                message: "The passwords do not match"
            });
            isError = true;
        }
        return isError;
    }

    const register = async () =>
    {
        if (validate()) return;
        if (!contextUser) return;

        try
        {
            setLoading(true);
            await contextUser.register(name, email, password);
            setLoading(false);
            setIsLoginOpen(false);
            router.refresh();
        }
        catch (e)
        {
            console.error(e);
            setLoading(false);
            alert(e);
        }
    }

    return (
        <div>
            <h1
                className="text-center text-[28px] mb-4 font-bold">
                Register
            </h1>

            <div
                className="px-6 pb-2">
                <TextInput
                    string={name}
                    inputType={"text"}
                    placeholder={"Username"}
                    onUpdate={setName}
                    error={showError("name")}
                />
            </div>

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
                className="px-6 pb-2">
                <TextInput
                    string={confirmPassword}
                    inputType={"password"}
                    placeholder={"Confirm Password"}
                    onUpdate={setConfirmPassword}
                    error={showError("confirmPassword")}
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
                            ${!name || !email || !password || !confirmPassword ? "bg-gray-200" : "bg-[#F02C56]"}
                        `}
                    disabled={loading}
                    onClick={register}>
                    { loading ? (
                        <BiLoaderCircle
                            className="animate-spin text-white"
                            size={25}
                        />
                    ) : "Register" }
                </button>
            </div>
        </div>
    );
}
