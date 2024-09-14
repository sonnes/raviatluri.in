'use client';

import { useEffect, useState } from 'react';

import { useSyncDemo } from '@tldraw/sync';
import { Tldraw, TLAssetStore } from 'tldraw';
import 'tldraw/tldraw.css';

import { Container } from '@/components/container';

export default function Draw() {
  const [name, setName] = useState('');
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem('drawUserName');
    if (storedName) {
      setName(storedName);
      setShowCanvas(true);
    }
  }, []);

  const handleNameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('drawUserName', name);
    setShowCanvas(true);
  };

  const store = useSyncDemo({
    roomId: 'raviatluri.in/draw',
    userInfo: {
      id: name,
      name: name,
    },
  });

  if (!showCanvas) {
    return (
      <Container className="mt-2 sm:mt-4">
        <form onSubmit={handleNameSubmit} className="max-w-md mx-auto">
          <label htmlFor="name" className="block mb-2">
            Please enter your name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Start Drawing
          </button>
        </form>
      </Container>
    );
  }

  return (
    <Container className="mt-2 sm:mt-4">
      <div className="w-full h-[calc(100vh-75px)]">
        <Tldraw store={store} />
      </div>
    </Container>
  );
}
