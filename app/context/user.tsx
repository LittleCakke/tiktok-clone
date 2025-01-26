"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode
} from "react";
import { account, ID } from "@/libs/AppWriteClient";
import { useRouter } from "next/navigation";
import useGetProfileByUserId from "@/app/hooks/useGetProfileByUserId";
import useCreateProfile from "@/app/hooks/useCreateProfile";
import type { User, UserContextTypes } from "@/app/types";

const UserContext = createContext<UserContextTypes | null>(null);
const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) =>
{
    let router = useRouter();

    let [ user, setUser ] = useState<User | null>(null);

    const checkUser = async () =>
    {
        try
        {
            let currentSession = await account.getSession("current");
            if (!currentSession) return;

            let promise = await account.get() as any;
            let profile = await useGetProfileByUserId(promise?.$id);

            setUser({
                id: promise?.$id,
                name: promise?.name,
                bio: profile?.bio,
                image: profile?.image
            });
        }
        catch (e)
        {
            setUser(null);
        }
    }

    const register = async (name: string, email: string, password: string) =>
    {
        try
        {
            let promise = await account.create(ID.unique(), email, password, name);
            await account.createEmailPasswordSession(email, password);

            await useCreateProfile(
                promise?.$id,
                name,
                `${process.env.NEXT_PUBLIC_PLACEHOLDER_DEFAULT_IMAGE_ID}`,
                ""
            );
            await checkUser();
        }
        catch (e)
        {
            throw e;
        }
    }

    const login = async (email: string, password: string) =>
    {
        try
        {
            await account.createEmailPasswordSession(email, password);
            await checkUser();
        }
        catch (e)
        {
            throw e;
        }
    }

    const logout = async () =>
    {
        try
        {
            await account.deleteSession("current");
            setUser(null);
            router.refresh();
        }
        catch (e)
        {
            throw e;
        }
    }

    useEffect(() =>
    {
        checkUser();
    }, []);

    return (
        <UserContext.Provider
            value={{ user, register, login, logout, checkUser }}>
            { children }
        </UserContext.Provider>
    );
}

export default UserProvider;

export const useUser = () => useContext(UserContext);
