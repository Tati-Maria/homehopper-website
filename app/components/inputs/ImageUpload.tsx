'use client'

import {CldUploadWidget} from "next-cloudinary";
import Image from "next/image";
import {useCallback} from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
    var cloudinary: any;
}

interface ImageUploadProps {
    onUpload: (value: string) => void;
    value: string;
}

const ImageUpload = ({onUpload, value}: ImageUploadProps) => {
    const handleUpload = useCallback((result: any) => {
        onUpload(result.info.secure_url);
    }, [onUpload]);

  return (
    <CldUploadWidget
    onUpload={handleUpload}
    uploadPreset="zsy0ja32"
    options={{
        maxFiles: 1,
    }}
     >
        {({open}) => {
            return (
                <div>
                    <button
                    className="
                    relative
                    hover:opacity-70
                    transition-opacity
                    border-dashed
                    border-2
                    p-20
                    border-indigo-500
                    rounded-lg
                    w-full
                    flex
                    flex-col
                    items-center
                    gap-4
                    text-neutral-500
                    " 
                    onClick={() => open?.()}
                        
                    >
                        <TbPhotoPlus size={50} />
                        <span className="text-sm">Upload Image</span>
                    </button>
                    {value && (
                        <div className=" absolute inset-0 w-full h-full">
                            <Image
                            alt="uploaded image"
                            fill
                            style={{objectFit: 'cover'}}
                            src={
                                value
                            }
                             />
                        </div>
                    )}
                </div>
            )
        }}
     </CldUploadWidget>
  )
}

export default ImageUpload;