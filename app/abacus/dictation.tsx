'use client';

import { useState } from 'react';

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

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

export function DictationWorksheet({ dictation }: DictationWorksheetProps) {
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-end mb-4">
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
  return (
    <div className="space-y-8">
      {dictations
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map((dictation, index) => (
          <div key={dictation.id}>
            {index > 0 && <div className="h-px bg-gray-200 my-8" />}
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Dictation {index + 1}</h1>
              <p className="text-gray-500 text-sm">
                Created on {dictation.createdAt.toLocaleDateString()}
              </p>
            </div>
            <DictationWorksheet dictation={dictation} />
          </div>
        ))}
    </div>
  );
}
