
import React, { useState } from 'react';
import { Upload, Camera, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UploadAreaProps {
  onImageSelected: (file: File) => void;
  isProcessing: boolean;
}

const UploadArea: React.FC<UploadAreaProps> = ({ onImageSelected, isProcessing }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleSelectedFile(file);
    }
  };

  const handleSelectedFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      onImageSelected(file);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleSelectedFile(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
      <div
        className={`relative rounded-lg border-2 border-dashed ${
          isDragging ? 'border-genuine' : 'border-gray-600'
        } transition-all p-6 flex flex-col items-center justify-center min-h-[300px] bg-navy-light/30 hover:bg-navy-light/50`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {selectedImage ? (
          <div className="relative w-full h-full">
            <img
              src={selectedImage}
              alt="Selected currency"
              className="w-full h-full object-contain rounded"
            />
            
            {isProcessing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded">
                <div className="relative">
                  <Loader2 className="w-12 h-12 animate-spin-detection text-genuine" />
                  <div className="scanner-line"></div>
                </div>
                <span className="absolute bottom-4 text-white font-medium">
                  Analyzing currency...
                </span>
              </div>
            )}
            
            {!isProcessing && (
              <button
                className="absolute top-2 right-2 p-1 bg-fake rounded-full hover:bg-fake-light transition-colors"
                onClick={handleClearImage}
              >
                <Trash2 className="w-5 h-5 text-white" />
              </button>
            )}
          </div>
        ) : (
          <>
            <Upload className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">Upload Currency Image</h3>
            <p className="text-sm text-muted-foreground mb-4 text-center">
              Drag and drop or click to browse files<br />
              (.jpg, .png, .jpeg)
            </p>
            <div className="flex gap-4">
              <Button 
                onClick={handleButtonClick}
                className="bg-secondary hover:bg-secondary/80"
              >
                <Upload className="w-4 h-4 mr-2" />
                Browse
              </Button>
              <Button 
                variant="outline"
                className="border-secondary hover:bg-secondary/10"
              >
                <Camera className="w-4 h-4 mr-2" />
                Use Camera
              </Button>
            </div>
          </>
        )}
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/jpeg,image/png,image/jpg"
        />
      </div>
    </div>
  );
};

export default UploadArea;
