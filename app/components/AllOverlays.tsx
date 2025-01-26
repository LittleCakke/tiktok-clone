"use client";

import { useGeneralStore } from "@/app/stores/general";
import ClientOnly from "./ClientOnly";
import AuthOverlay from "./AuthOverlay";
import EditProfileOverlay from "./profile/EditProfileOverlay";

export default function AllOverlays()
{
    let { isLoginOpen, isEditProfileOpen } = useGeneralStore();

    return (
        <>
            <ClientOnly>
                { isLoginOpen && (
                    <AuthOverlay />
                ) }
                { isEditProfileOpen && (
                    <EditProfileOverlay />
                ) }
            </ClientOnly>
        </>
    );
}
