import { storage } from "@/libs/AppWriteClient";
import Image from "image-js";

const useChangeUserImage = async (file: File, cropper: any, currentImage: string) =>
{
    let videoId = Math
        .random()
        .toString(36)
        .slice(2, 22);

    let x = cropper.left;
    let y = cropper.top;
    let width = cropper.width;
    let height = cropper.height;

    try
    {
        let response = await fetch(URL.createObjectURL(file));
        let imageBuffer = await response.arrayBuffer();

        let image = await Image.load(imageBuffer);
        let croppedImage = image.crop({ x, y, width, height });
        let resizeImage = croppedImage.resize({ width: 200, height: 200 });
        let blob = await resizeImage.toBlob();
        let arrayBuffer = await blob.arrayBuffer();
        let finalFile = new File([arrayBuffer], file.name, { type: blob.type });

        let result = await storage.createFile(
            `${process.env.NEXT_PUBLIC_BUCKET_ID}`,
            videoId,
            finalFile
        );

        if (currentImage !== `${process.env.NEXT_PUBLIC_PLACEHOLDER_DEFAULT_IMAGE_ID}`)
        {
            await storage.deleteFile(
                `${process.env.NEXT_PUBLIC_BUCKET_ID}`,
                currentImage
            );
        }

        return result?.$id;
    }
    catch (e)
    {
        throw e;
    }
}

export default useChangeUserImage;
