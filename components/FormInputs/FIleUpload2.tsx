import React, { useState } from 'react';
import { useField } from 'formik';
import axios from 'axios';

interface FileUploadProps {
    name: string;
    wrapperClass?: string;
    extraClass?: string;
    onFileChange?: (file: File) => void;
    children?: React.ReactNode;
    fileType?: "image" | "document";
}

const FileUpload: React.FC<FileUploadProps> = ({ name, wrapperClass, onFileChange, children, fileType, extraClass, ...restProps }) => {
    const [_, meta, helpers] = useField(name);
    const [fileName, setFileName] = useState("");
    const [uploadError, setUploadError] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);

    const validateFile = (file: File) => {
        const validFormats = fileType === "document"
            ? ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
            : ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
        const minSize = 10 * 1024; // 10 KB
        const maxSize = 5 * 1024 * 1024; // 5 MB
 
        if (!validFormats.includes(file.type)) {
            setUploadError(`Invalid file format. Supported formats are ${fileType === "document" ? "PDF, WPS, WORD" : "PNG, JPG, PDF"}`);
            return false;
        }

        if (file.size < minSize || file.size > maxSize) {
            setUploadError("File size must be between 10KB and 5MB");
            return false;
        }

        setUploadError("");
        return true;
    };

    const handleFileUpload = async (file: File) => {
        if (!validateFile(file)) return;
        setIsUploading(true);
        if (onFileChange) {
            onFileChange(file);
        }
        setFileName(file?.name || "");

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'products_upload');

        try {
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/profitall/upload',
                formData
            );
            const fileUrl = response.data.secure_url;
            helpers.setValue(fileUrl);
            setIsUploading(false);
        } catch (error) {
            console.error('Error uploading file:', error);
            setIsUploading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);

        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => {
        setDragOver(false);
    };

    return (
        <div>
            <div className='flex h-[54px]' >
                <div className='w-[54px] flex items-center justify-center rounded-l-[10px] h-full bg-[#1F2126]'>
                    <img src='/assets/attachment.svg' alt='' />
                </div>
                <div className={`flex flex-col w-full ${wrapperClass}`}>
                    <div
                        className={`relative bg-primary bg-opacity-10 py-2  !h-full border border-[#470e812b] rounded-r-[10px] flex flex-col px-3 justify-center ${extraClass} ${dragOver ? 'bg-blue-100' : ''}`}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                    >
                        <h3 className='text-sm'>Drag & Drop files or <label className='text-primary text-sm cursor-pointer underline font-semibold' htmlFor={name}>
                            Tap to Upload
                        </label>
                        </h3>

                        {
                            isUploading ? (
                                <h3 className='text-xs truncate whitespace-nowrap '>{isUploading && "Uploading..."}</h3>
                            ) : (
                                fileName !== "" ? (
                                    <h3 className='text-xs truncate whitespace-nowrap'>{fileName}</h3>
                                ) : (
                                    fileType === "document" ? (
                                        <h5 className='text-xs text-[#6F7174]'>Supported formats: PDF, WPS, WORD</h5>
                                    ) : (
                                        <h5 className='text-xs text-[#6F7174]'>Jpg, png or pdf - 5MB max size</h5>
                                    )
                                )
                            )
                        }




                        <input
                            onChange={handleFileChange}
                            id={name}
                            type="file"
                            accept={fileType === "document" ? ".pdf,.doc,.docx" : ".png,.jpg,.jpeg,.svg,.pdf"}
                            className="cursor-pointer absolute opacity-0 h-full w-full"
                            {...restProps}
                        />
                    </div>

                </div>
            </div>
            {uploadError && (
                <small className='text-xs text-red-600'>{uploadError}</small>
            )}
            {meta.touched && meta.error ? (
                <small className='text-xs text-red-600'>{meta.error}</small>
            ) : null}
        </div>

    );
};

export default FileUpload;
