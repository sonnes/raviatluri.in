'use client';

import { useEffect, useRef, useState } from 'react';

import { Dialog } from '@headlessui/react';
import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { useAbacus } from './context';
import { type Dictation, type DictationSection } from './types';

interface DictationWorksheetProps {
  dictation: Dictation;
}

interface ProblemRowProps {
  problems: DictationSection['problems'];
  startIndex: number;
  endIndex: number;
  maxNumbers: number;
}

function ProblemRow({ problems, startIndex, endIndex, maxNumbers }: ProblemRowProps) {
  return (
    <>
      {Array.from({ length: maxNumbers }).map((_, numberIndex) => (
        <div key={`row-${numberIndex}`} className="grid grid-cols-10">
          {problems.slice(startIndex, endIndex).map((problem, problemIndex) => (
            <div
              key={`cell-${problemIndex}-${numberIndex}`}
              className="p-2 text-center border-r border-b border-gray-300"
            >
              <div className="w-1/2 text-right">
                {numberIndex < problem.numbers.length ? problem.numbers[numberIndex] : ''}
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

interface AnswerRowProps {
  problems: DictationSection['problems'];
  startIndex: number;
  endIndex: number;
}

function AnswerRow({ problems, startIndex, endIndex }: AnswerRowProps) {
  return (
    <div className="grid grid-cols-10 bg-green-100">
      {problems.slice(startIndex, endIndex).map((problem, index) => (
        <div
          key={`answer-${index}`}
          className="p-2 text-center border-r border-b border-gray-300 font-bold text-green-700"
        >
          <div className="w-1/2 text-right">{problem.answer}</div>
        </div>
      ))}
    </div>
  );
}

function DictationSection({
  section,
  startNumber,
  showAnswers,
}: {
  section: DictationSection;
  startNumber: number;
  showAnswers: boolean;
}) {
  const maxNumbers = Math.max(...section.problems.map(p => p.numbers.length));

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">
          {section.type === 'abacus' ? 'Abacus' : 'Visualisation'}
        </h2>
      </div>

      <div className="border border-gray-300 rounded">
        {/* Header row with numbers */}
        <div className="grid grid-cols-10 bg-gray-800 text-white font-medium">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={`header-${i}`} className="p-2 text-center border-r border-gray-600">
              {startNumber + i}
            </div>
          ))}
        </div>

        {/* First set of problems */}
        <ProblemRow
          problems={section.problems}
          startIndex={0}
          endIndex={10}
          maxNumbers={maxNumbers}
        />

        {/* First set of answers */}
        {showAnswers && <AnswerRow problems={section.problems} startIndex={0} endIndex={10} />}

        {/* Second set of problems if more than 10 */}
        {section.problems.length > 10 && (
          <>
            <div className="grid grid-cols-10 bg-gray-800 text-white font-medium mt-8">
              {Array.from({ length: 10 }, (_, i) => (
                <div key={`header-${i + 10}`} className="p-2 text-center border-r border-gray-600">
                  {startNumber + i + 10}
                </div>
              ))}
            </div>

            <ProblemRow
              problems={section.problems}
              startIndex={10}
              endIndex={20}
              maxNumbers={maxNumbers}
            />

            {/* Second set of answers */}
            {showAnswers && <AnswerRow problems={section.problems} startIndex={10} endIndex={20} />}
          </>
        )}
      </div>
    </div>
  );
}

function Player({ dictation }: { dictation: Dictation }) {
  const allProblems = dictation.sections.flatMap(section => section.problems);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<number | undefined>(undefined);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playQuestion = async (index: number) => {
    if (index >= allProblems.length) {
      setIsPlaying(false);
      setCurrentQuestion(undefined);
      audioRef.current?.pause();
      audioRef.current = null;
      return;
    }

    const problem = allProblems[index];
    const audio = new Audio(`data:audio/mp3;base64,${problem.audio}`);
    audioRef.current = audio;

    setCurrentQuestion(index);
    setIsPlaying(true);

    try {
      await audio.play();
      await new Promise(resolve => {
        audio.onended = () => {
          setTimeout(resolve, 2000);
        };
      });
      playQuestion(index + 1);
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (currentQuestion === undefined) {
      playQuestion(0);
      return;
    }

    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={togglePlay}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
      >
        {isPlaying ? 'Pause' : currentQuestion === undefined ? 'Play' : 'Resume'}
      </button>
    </div>
  );
}

export function DictationWorksheet({ dictation }: DictationWorksheetProps) {
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between mb-4">
        <Player dictation={dictation} />
        <button
          onClick={() => setShowAnswers(!showAnswers)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          {showAnswers ? (
            <>
              <EyeSlashIcon className="h-4 w-4" />
              <span>Hide Answers</span>
            </>
          ) : (
            <>
              <EyeIcon className="h-4 w-4" />
              <span>Show Answers</span>
            </>
          )}
        </button>
      </div>

      {dictation.sections.map((section, index) => (
        <DictationSection
          key={`section-${index}`}
          section={section}
          startNumber={index * 20 + 1}
          showAnswers={showAnswers}
        />
      ))}
    </div>
  );
}

export function DictationList() {
  const { dictations } = useAbacus();
  const [selectedDictation, setSelectedDictation] = useState<Dictation | null>(null);

  return (
    <div className="space-y-8">
      {dictations
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map((dictation, index) => (
          <div key={dictation.id}>
            {index > 0 && <div className="h-px bg-gray-200 my-8" />}
            <div className="mb-6">
              <button
                onClick={() => setSelectedDictation(dictation)}
                className="text-2xl font-bold hover:text-blue-600 transition-colors cursor-pointer"
              >
                {getTitle(dictation.id)}
              </button>
              <p className="text-gray-500 text-sm">Created on {formatDate(dictation.createdAt)}</p>
            </div>
          </div>
        ))}

      <Dialog
        open={selectedDictation !== null}
        onClose={() => setSelectedDictation(null)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-4xl w-full rounded-lg bg-white p-6">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-xl font-bold">
                {getTitle(selectedDictation?.id ?? '')}
              </Dialog.Title>
              <button
                onClick={() => setSelectedDictation(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {selectedDictation && <DictationWorksheet dictation={selectedDictation} />}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}

function getTitle(id: string) {
  return id
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
