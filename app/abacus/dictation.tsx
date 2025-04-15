'use client';

import { useAbacus } from './context';
import { type Dictation, type DictationSection } from './types';

interface DictationWorksheetProps {
  dictation: Dictation;
}

function DictationSection({
  section,
  startNumber,
}: {
  section: DictationSection;
  startNumber: number;
}) {
  return (
    <div className="mb-4 md:mb-8">
      <h2 className="mb-2 text-base md:text-lg font-semibold flex flex-col md:flex-row md:justify-between">
        <div>{section.type === 'abacus' ? 'Abacus' : 'Visualisation'}</div>
      </h2>

      {/* Scrollable container for small screens */}
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[800px] md:min-w-0">
          {' '}
          {/* Minimum width for mobile scrolling */}
          <div className="grid grid-cols-10 gap-0.5">
            {/* Header row with numbers */}
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={`header-${i}`}
                className="bg-navy-900 text-white p-1 md:p-2 text-center text-sm md:text-base"
              >
                {startNumber + i}
              </div>
            ))}

            {/* Problem cells */}
            {section.problems.map((problem, index) => (
              <div
                key={`problem-${index}`}
                className="border border-gray-300 p-1 md:p-2 flex flex-col items-center justify-start"
              >
                {problem.numbers.map((num, numIndex) => (
                  <div
                    key={`num-${numIndex}`}
                    className="w-full mb-1 text-sm md:text-base text-right"
                  >
                    {num}
                  </div>
                ))}
                <div className="mt-auto border-t border-gray-300 w-full text-right font-bold">
                  {problem.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function DictationWorksheet({ dictation }: DictationWorksheetProps) {
  return (
    <div className="p-2 md:p-4 max-w-5xl mx-auto">
      {dictation.sections.map((section, index) => (
        <DictationSection key={`section-${index}`} section={section} startNumber={index * 10 + 1} />
      ))}
    </div>
  );
}

export function DictationList() {
  const { dictations } = useAbacus();
  return (
    <div>
      {dictations.map(dictation => (
        <DictationWorksheet key={dictation.id} dictation={dictation} />
      ))}
    </div>
  );
}
