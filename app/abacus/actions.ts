'use server';

import { revalidatePath } from 'next/cache';

import { GoogleGenAI } from '@google/genai';

import type { DictationSection } from './types';

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

const SYSTEM_PROMPT = `
Extract the table from the image and return it as JSON. 

Each column is a separate problem. Group the problems by section. Each section has a type: 'abacus' or 'visualization'. Type is based on the heading of the section.

EXAMPLE OUTPUT:

\`\`\`json
{
  "sections": [
    {
      "type": "abacus",
      "problems": [
        {
          "numbers": [12, 21, -5]
        },
        {
          "numbers": [13, 22, 7]
        },
        {
          "numbers": [14, 23, 10]
        }
      ]
    },
    {
      "type": "visualization",
      "problems": [
        {
          "numbers": [9, -3, 2]
        },
        {
          "numbers": [10, -4, 3]
        },
        {
          "numbers": [11, -5, 4]
        }
      ]
    }
  ]
}
\`\`\`
`;

export async function parseWorksheet(file: File) {
  // Convert file to base64
  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');

  const generatedContent = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    config: {
      responseMimeType: 'application/json',
    },
    contents: [
      { text: SYSTEM_PROMPT },
      {
        inlineData: {
          data: base64,
          mimeType: file.type,
        },
      },
    ],
  });

  if (!generatedContent.text) {
    throw new Error('No response from Google GenAI');
  }

  const parsed = JSON.parse(generatedContent.text);

  return parsed.sections as DictationSection[];
}

export async function createDictation(formData: FormData) {
  const file = formData.get('file') as File;

  if (!file) {
    return { success: false, error: 'No file provided' };
  }

  const sections = await parseWorksheet(file);

  for (const section of sections) {
    for (const problem of section.problems) {
      problem.answer = problem.numbers.reduce((a, b) => a + b, 0);
    }
  }

  const dictation = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    sections,
  };

  revalidatePath('/abacus');

  return { success: true, error: null, dictation };
}
