'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from './Button';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  disabled,
}) => {
  const [imageUrl, setImageUrl] = useState(value);

  const handleUpload = (result: any) => {
    const url = result.info.secure_url;
    setImageUrl(url);
    onChange(url);
  };

  return (
    <div className="space-y-4">
      {imageUrl && (
        <div className="relative w-full h-64 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt="Upload"
            fill
            className="object-cover"
          />
        </div>
      )}
      <CldUploadWidget
        uploadPreset="ml_default"
        onSuccess={handleUpload}
      >
        {({ open }) => (
          <Button
            type="button"
            variant="outline"
            onClick={() => open()}
            disabled={disabled}
            className="w-full"
          >
            {imageUrl ? 'Change Image' : 'Upload Image'}
          </Button>
        )}
      </CldUploadWidget>
    </div>
  );
};
