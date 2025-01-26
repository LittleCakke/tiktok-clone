import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import TextInput from "@/app/components/TextInput";
import { Cropper } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { BiLoaderCircle } from "react-icons/bi";
import { useProfileStore } from "@/app/stores/profile";
import { useGeneralStore } from "@/app/stores/general";
import { useUser } from "@/app/context/user";
import useUpdateProfile from "@/app/hooks/useUpdateProfile";
import useChangeUserImage from "@/app/hooks/useChangeUserImage";
import useUpdateProfileImage from "@/app/hooks/useUpdateProfileImage";
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";
import type { CropperDimensions, ShowErrorObject } from "@/app/types";

export default function EditProfileOverlay()
{
    const router = useRouter();
    const contextUser = useUser();

    let { currentProfile, setCurrentProfile } = useProfileStore();
    let { setIsEditProfileOpen } = useGeneralStore();

    let [ file, setFile ] = useState<File | null>(null);
    let [ cropper, setCropper ] = useState<CropperDimensions | null>(null);
    let [ uploadImage, setUploadImage ] = useState<string | null>(null);
    let [ userImage, setUserImage ] = useState("");
    let [ username, setUsername ] = useState("");
    let [ userBio, setUserBio ] = useState("");
    let [ isUpdating, setIsUpdating ] = useState(false);
    let [ error, setError ] = useState<ShowErrorObject | null>(null);

    const getUploadedImage = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
    {
        let selectedFile = target.files && target.files[0];

        if (selectedFile)
        {
            setFile(selectedFile);
            setUploadImage(URL.createObjectURL(selectedFile));
        }
        else
        {
            setFile(null);
            setUploadImage(null);
        }
    }

    const showError = (type: string) =>
    {
        if (error && Object.entries(error).length > 0 && error?.type === type)
            return error.message;
        return "";
    }

    const cropAndUpdateImage = async () =>
    {
        if (validate()) return;
        if (!contextUser?.user) return;

        try
        {
            if (!file) return window.alert("You have no file");
            if (!cropper) return window.alert("You have no file");

            setIsUpdating(true);

            let newImageId = await useChangeUserImage(file, cropper, userImage);
            await useUpdateProfileImage(currentProfile?.id || "", newImageId);

            await contextUser.checkUser();
            setCurrentProfile(contextUser?.user?.id);
            setIsEditProfileOpen(false);
            setIsUpdating(false);
        }
        catch (e)
        {
            console.error(e);
            setIsUpdating(false);
            window.alert(e);
        }
    }

    const validate = () =>
    {
        setError(null);
        let isError = false;

        if (!username)
        {
            setError({
                type: "username",
                message: "A username is required"
            });
            isError = true;
        }
        return isError;
    }

    const updateUserInfo = async () =>
    {
        if (validate()) return;
        if (!contextUser?.user) return;

        try
        {
            setIsUpdating(true);
            await useUpdateProfile(currentProfile?.id || "", username, userBio);
            setCurrentProfile(contextUser?.user?.id);
            setIsUpdating(false);
            setIsEditProfileOpen(false);
            router.refresh();
        }
        catch (e)
        {
            console.error(e);
            alert(e);
        }
    }

    const hasUploadedImage = () =>
    {
        if (!uploadImage)
        {
            return (
                <div>
                    <div
                        id="ProfilePhotoSection"
                        className="flex
                        flex-col
                        border-b
                        sm:h-[118px]
                        h-[145px]
                        px-1.5
                        py-2
                        w-full">
                        <h3
                            className="font-semibold
                            text-[15px]
                            sm:mb-0
                            text-gray-700
                            sm:w-[160px]
                            sm:text-left
                            text-center">
                            Profile photo
                        </h3>

                        <div
                            className="flex
                            items-center
                            justify-center
                            sm:-mt-6">
                            <label
                                htmlFor="image"
                                className="relative
                                cursor-pointer">
                                <img
                                    className="rounded-full"
                                    width={95}
                                    alt="avatar"
                                    src={useCreateBucketUrl(userImage)} />

                                <button
                                    className="absolute
                                    bottom-0
                                    right-0
                                    rounded-full
                                    bg-white
                                    shadow-xl
                                    border
                                    p-1
                                    border-gray-300
                                    inline-block
                                    w-[32px]
                                    h-[32px]">
                                    <BsPencil
                                        size={17}
                                        className="ml-0.5" />
                                </button>
                            </label>

                            <input
                                className="hidden"
                                type="file"
                                id="image"
                                onChange={getUploadedImage}
                                accept=".png,.jpg,.jpeg" />
                        </div>
                    </div>

                    <div
                        id="UsernameSection"
                        className="flex
                        flex-col
                        border-b
                        sm:h-[110px]
                        px-1.5
                        py-2
                        mt-1.5
                        w-full">
                        <h3
                            className="font-semibold
                            text-[15px]
                            sm:mb-0
                            text-gray-700
                            sm:w-[160px]
                            sm:text-left
                            text-center">
                            Username
                        </h3>

                        <div
                            className="flex
                            items-center
                            justify-center
                            sm:-mt-6">
                            <div
                                className="sm:w-[60%] w-full max-w-md">
                                <TextInput
                                    string={username}
                                    inputType="text"
                                    placeholder="Username"
                                    onUpdate={setUsername}
                                    error={showError("username")} />

                                <p
                                    className={`relative
                                    text-[11px]
                                    text-gray-500
                                    ${error ? "mt-1" : "mt-4"}`}>
                                    Usernames can only contain letters,
                                    numbers, underscores, and periods.
                                    Changing your username will also
                                    change your profile link.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        id="UserBioSection"
                        className="flex
                        flex-col
                        sm:h-[120px]
                        px-1.5
                        py-2
                        mt-2
                        w-full">
                        <h3
                            className="font-semibold
                            text-[15px]
                            sm:mb-0
                            text-gray-700
                            sm:w-[160px]
                            sm:text-left
                            text-center">
                            Bio
                        </h3>

                        <div
                            className="flex
                            items-center
                            justify-center
                            sm:-mt-6">
                            <div
                                className="sm:w-3/5 w-full max-w-md">
                                <textarea
                                    placeholder="This is some text..."
                                    cols={30}
                                    rows={4}
                                    onChange={e => setUserBio(e.target.value)}
                                    value={userBio || ""}
                                    maxLength={80}
                                    className="outline-none
                                    resize-none
                                    w-full
                                    border
                                    border-gray-300
                                    bg-[#F1F1F2]
                                    text-gray-800
                                    rounded-md
                                    py-2.5
                                    px-3" />
                                <p
                                    className="text-[11px]
                                    text-gray-500">
                                    { userBio ? userBio.length : 0 }/80
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else
        {
            return (
                <div
                    className="w-full
                    max-h-[420px]
                    mx-auto
                    bg-black
                    circle-stencil">
                    <Cropper
                        className="h-[400px]"
                        stencilProps={{
                            aspectRatio: 1
                        }}
                        onChange={c => setCropper(c.getCoordinates())}
                        src={uploadImage}
                    />
                </div>
            );
        }
    }

    const hasUploadedImageToSetBtn = () =>
    {
        if (!uploadImage)
        {
            return (
                <div
                    id="UpdateInfoButtons"
                    className="flex items-center justify-end">
                    <button
                        disabled={isUpdating}
                        onClick={() => setIsEditProfileOpen(false)}
                        className="flex
                        items-center
                        border
                        rounded-sm
                        px-3
                        py-[6px]
                        duration-200
                        hover:bg-gray-100">
                        <span
                            className="px-2 font-medium text-[15px]">
                            Cancel
                        </span>
                    </button>

                    <button
                        onClick={() => updateUserInfo()}
                        className="flex
                        items-center
                        border
                        bg-[#F02C56]
                        text-white
                        rounded-md
                        ml-3
                        px-3
                        py-1.5">
                        <span
                            className="px-2 font-medium text-[15px]">
                            { isUpdating
                                ? <BiLoaderCircle
                                    className="my-1 mx-2.5 animate-spin text-white" />
                                : "Save"
                            }
                        </span>
                    </button>
                </div>
            );
        }
        else
        {
            return (
                <div
                    id="CropperButtons"
                    className="flex items-center justify-end">
                    <button
                        onClick={() => setUploadImage(null)}
                        className="flex
                        items-center
                        border
                        rounded-sm
                        px-3
                        py-[6px]
                        duration-200
                        hover:bg-gray-100">
                        <span
                            className="px-2 font-medium text-[15px]">
                            Cancel
                        </span>
                    </button>

                    <button
                        disabled={isUpdating}
                        onClick={() => cropAndUpdateImage()}
                        className="flex
                        items-center
                        border
                        bg-[#F02C56]
                        text-white
                        rounded-md
                        ml-3
                        px-3
                        py-1.5">
                        <span
                            className="px-2 font-medium text-[15px]">
                            { isUpdating
                                ? <BiLoaderCircle
                                    className="my-1 mx-2.5 animate-spin text-white" />
                                : "Apply"
                            }
                        </span>
                    </button>
                </div>
            );
        }
    }

    useEffect(() =>
    {
        setUsername(currentProfile?.name || "");
        setUserBio(currentProfile?.bio || "");
        setUserImage(currentProfile?.image || "");
    }, []);

    return (
        <>
            <div
                id="EditProfileOverlay"
                className="fixed
                flex
                justify-center
                pt-14
                md:pt-[105px]
                z-50
                top-0
                left-0
                w-full
                h-full
                bg-black
                bg-opacity-50
                overflow-auto">
                <div
                    className={`
                        relative
                        bg-white
                        w-full
                        max-w-[700px]
                        h-[580px]
                        mx-3
                        p-4
                        rounded-lg
                        mb-10
                    `}>
                    {/* ${!uploadImage ? "h-[655px]" : "h-[580px]"} */}
                    <div
                        className={`
                            absolute
                            flex
                            items-center
                            justify-between
                            w-full
                            p-5
                            left-0
                            top-0
                            border-b
                            border-b-gray-300
                        `}>
                        <h1
                            className={`text-[22px] font-medium`}>
                            Edit profile
                        </h1>

                        <button
                            disabled={isUpdating}
                            onClick={() => setIsEditProfileOpen(false)}
                            className="hover:bg-gray-200
                            duration-200
                            p-1
                            rounded-full">
                            <AiOutlineClose
                                size={25} />
                        </button>
                    </div>

                    <div
                        className={`
                            h-[calc(500px-200px)]
                            ${!uploadImage ? "mt-16" : "mt-[58px]"}
                        `}>
                        { hasUploadedImage() }
                    </div>

                    <div
                        id="ButtonSection"
                        className="absolute
                        p-5
                        left-0
                        bottom-0
                        border-t
                        border-t-gray-300
                        w-full">
                        { hasUploadedImageToSetBtn() }
                    </div>
                </div>
            </div>
        </>
    );
}
