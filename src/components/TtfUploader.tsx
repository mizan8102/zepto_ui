import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const TtfUploader: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file); // Append file to form data

    try {
      const response = await axios.post(
        "https://your-api-endpoint.com/upload", // Replace with your API endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Required for file uploads
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted); // Track upload progress
          },
        }
      );
      console.log("File uploaded successfully:", response.data);
      setUploadProgress(null); // Reset progress after successful upload
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("File upload failed. Please try again.");
      setUploadProgress(null); // Reset progress on error
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null); // Reset error state
    setUploadProgress(null); // Reset progress bar state
    const file = acceptedFiles[0]; // Accept a single file for now

    // Validate file type using MIME type and extension
    const isValidTtf =
      file.type === "font/ttf" || file.name.toLowerCase().endsWith(".ttf");

    if (isValidTtf) {
      setFileName(file.name); // Set file name
      uploadFile(file); // Upload file via Axios
    } else {
      setError("Please upload a valid TTF file.");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "font/ttf": [".ttf"], // Specify allowed file type
    },
    multiple: false, // Single file upload
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
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
          />
        </svg>
       
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {isDragActive ? (
            <p className="text-blue-500">Drop the file here...</p>
          ) : (
            <p className="text-gray-500">
              Drag & drop a TTF file here, or click to select one
            </p>
          )}
        </p>
      </div>
      <input {...getInputProps()} />

      {fileName && <p className="text-green-600 mt-2">Uploaded: {fileName}</p>}
      {uploadProgress !== null && (
        <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
          <div
            className="bg-blue-600 h-4 rounded-full"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default TtfUploader;
