import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axiosInstance from "../helpers/axios/axiosInstance";
import { useDispatch } from 'react-redux';
import { triggerRefresh } from '../redux/fontsSlice';

const TtfUploader: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const dispatch = useDispatch();

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("font", file);

    try {
      const response = await axiosInstance.post(
        "/font",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted); 
          },
        }
      );
      console.log("File uploaded successfully:", response.data);
      setUploadProgress(null); 
      dispatch(triggerRefresh()); // Trigger font list refresh

    } catch (error) {
      console.error("Error uploading file:", error);
      setError("File upload failed. Please try again.");
      setUploadProgress(null); 
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    setUploadProgress(null); 
    const file = acceptedFiles[0]; 

    const isValidTtf =
      file.type === "font/ttf" || file.name.toLowerCase().endsWith(".ttf");

    if (isValidTtf) {
      setFileName(file.name); 
      uploadFile(file); 
    } else {
      setError("Please upload a valid TTF file.");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "font/ttf": [".ttf"], 
    },
    multiple: false, 
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-gray-300 border-dashed mr-16 rounded-lg p-6 text-center cursor-pointer ${
        isDragActive ? "border-blue-500" : "border-gray-400"
      }`}
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <svg
          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 16"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.014 5.069 5 5 5a3 3 0 0 0-3 3v5a3 3 0 0 0 3 3h8z"
          />
        </svg>
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold">Click to upload or drag and drop</span> your .ttf file here
        </p>
     
        {error && <p className="mt-2 text-red-500">{error}</p>}
        {uploadProgress !== null && <p className="mt-2">Uploading: {uploadProgress}%</p>}
        {fileName && <p className="mt-2">Uploaded file: {fileName}</p>}
        <input {...getInputProps()} />
      </div>
    </div>
  );
};

export default TtfUploader;
