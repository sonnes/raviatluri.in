'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import type { Dictation } from './types';

interface AbacusContextType {
  dictations: Dictation[];
  addDictation: (dictation: Dictation) => void;
}

const AbacusContext = createContext<AbacusContextType | undefined>(undefined);

export function AbacusProvider({ children }: { children: React.ReactNode }) {
  const [dictations, setDictations] = useState<Dictation[]>([]);

  const addDictation = (dictation: Dictation) => {
    setDictations([...dictations, dictation]);
  };

  useEffect(() => {
    const dictations = localStorage.getItem('dictations');
    if (dictations) {
      setDictations(
        JSON.parse(dictations, (key, value) => {
          if (key === 'createdAt') {
            return new Date(value);
          }
          return value;
        })
      );
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('dictations', JSON.stringify(dictations));
    } catch (error) {
      console.error('Error saving dictations:', error);
    }
  }, [dictations]);

  return (
    <AbacusContext.Provider value={{ dictations, addDictation }}>{children}</AbacusContext.Provider>
  );
}

export function useAbacus() {
  const context = useContext(AbacusContext);
  if (!context) {
    throw new Error('useAbacus must be used within a AbacusProvider');
  }

  return context;
}
