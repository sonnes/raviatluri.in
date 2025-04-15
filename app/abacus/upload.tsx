'use client';

import { useRef, useState } from 'react';

import { ImageIcon } from '@/components/icons';

import { createDictation } from './actions';
import { useAbacus } from './context';

export default function UploadForm() {
  const [isDragging, setIsDragging] = useState(false);
  const { addDictation } = useAbacus();
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    setUploadStatus('loading');

    const file = e.dataTransfer.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      const { success, error, dictation } = await createDictation(formData);
      if (error) {
        setUploadStatus('error');
      } else if (success && dictation) {
        setUploadStatus('success');
        addDictation(dictation);
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadStatus('loading');

    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      const { success, error, dictation } = await createDictation(formData);
      if (error) {
        setUploadStatus('error');
      } else if (success && dictation) {
        setUploadStatus('success');
        addDictation(dictation);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="col-span-full">
        <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
          Upload Page
        </label>
        <div
          className={`mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 ${
            isDragging ? 'border-indigo-600 bg-indigo-50' : ''
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <ImageIcon className="mx-auto size-12 text-gray-300" />
            <div className="mt-4 flex text-sm/6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
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
            <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>
      {uploadStatus && (
        <div className="mt-4">
          {uploadStatus === 'error' ? (
            <div className="text-sm text-red-600">Error uploading file</div>
          ) : uploadStatus === 'loading' ? (
            <div className="text-sm text-gray-600">Uploading...</div>
          ) : uploadStatus === 'success' ? (
            <div className="text-sm text-green-600">File uploaded successfully!</div>
          ) : null}
        </div>
      )}
    </div>
  );
}
