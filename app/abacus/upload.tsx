'use client';

import { useRef, useState } from 'react';

import imageCompression from 'browser-image-compression';

import { ImageIcon } from '@/components/icons';

import { createDictation } from './actions';
import { useAbacus } from './context';

export default function UploadForm({ password }: { password: string }) {
  const [isDragging, setIsDragging] = useState(false);
  const { addDictation } = useAbacus();
  const [uploadStatus, setUploadStatus] = useState<
    'idle' | 'compressing' | 'uploading' | 'success' | 'error'
  >('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressImage = async (file: File): Promise<File> => {
    const options = {
      maxSizeMB: 10,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      return await imageCompression(file, options);
    } catch (error) {
      console.error('Error compressing image:', error);
      throw error;
    }
  };

  const handleFileUpload = async (file: File) => {
    setUploadStatus('compressing');
    try {
      setUploadStatus('uploading');

      const compressedFile = await compressImage(file);

      const formData = new FormData();
      formData.append('file', compressedFile);
      formData.append('password', password);

      const { success, error, dictation } = await createDictation(formData);
      if (error) {
        setUploadStatus('error');
      } else if (success && dictation) {
        setUploadStatus('success');
        addDictation(dictation);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('error');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="col-span-full">
        <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-text-primary">
          Upload Page
        </label>
        <div
          className={`mt-2 flex justify-center rounded-lg border border-dashed border-border px-6 py-10 ${
            isDragging ? 'border-primary bg-primary-50' : ''
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <ImageIcon className="mx-auto size-12 text-text-muted" />
            <div className="mt-4 flex text-sm/6 text-text-secondary">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-surface font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs/5 text-text-secondary">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>
      {uploadStatus && (
        <div className="mt-4 text-lg font-bold">
          {uploadStatus === 'error' ? (
            <div className="text-primary">Error uploading file</div>
          ) : uploadStatus === 'compressing' ? (
            <div className="text-text-secondary">Compressing...</div>
          ) : uploadStatus === 'uploading' ? (
            <div className="text-text-secondary">Generating...</div>
          ) : uploadStatus === 'success' ? (
            <div className="text-green-600">Worksheet ready!</div>
          ) : null}
        </div>
      )}
    </div>
  );
}
