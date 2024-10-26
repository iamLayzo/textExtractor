import React, { useState, useRef } from 'react';

interface FileUploaderProps {
  onImageSelect: (file: File | null) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onImageSelect }) => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      onImageSelect(selectedFile); 
      simulateUpload(selectedFile);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
      onImageSelect(droppedFile);
      simulateUpload(droppedFile);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const simulateUpload = (file: File) => {
    const fileSize = file.size;
    const uploadSpeed = 50000;
    let uploaded = 0;

    const interval = setInterval(() => {
      uploaded += uploadSpeed;
      const newProgress = Math.min((uploaded / fileSize) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(interval);
      }
    }, 200);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageSelect(null); 
  };

  return (
    <div className="bg-transparent p-6 max-w-lg mx-auto">
      {!file ? (
        <div
          className="border-2 border-dashed border-gray-500 rounded-lg p-8 mb-4 text-center cursor-pointer hover:border-gray-400 transition-all"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          <svg
            className="mx-auto mb-4 text-gray-400"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 16L12 12L8 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 12V21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 21H3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.5 9C19.5 4.85786 16.1421 1.5 12 1.5C7.85786 1.5 4.5 4.85786 4.5 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-lg text-gray-300">
            <span className="font-semibold text-blue-500 underline cursor-pointer">Upload an image</span> or drag and drop
          </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".jpg,.jpeg,.png"
          />
          <p className="text-gray-500 mt-2">JPEG · PNG · WEBP · BMP · PBM</p>
        </div>
      ) : (
        <div className="relative">
          <img src={URL.createObjectURL(file)} alt="Selected file" className="w-full h-auto object-cover rounded-lg shadow-lg" />
          <button
            onClick={handleRemoveFile}
            className="absolute top-0 right-0 m-2 text-red-500 hover:text-red-700 transition-all bg-gray-800 rounded-full p-1"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      {file && (
        <div className="bg-gray-800 rounded-lg p-4 mb-4 text-white relative">
          <div className="h-2 bg-gray-600 rounded-full">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-xs float-right mt-1">{progress.toFixed(2)}%</span>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
