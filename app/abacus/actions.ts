'use server';

import { revalidatePath } from 'next/cache';

import { GoogleGenAI } from '@google/genai';
import { ElevenLabsClient } from 'elevenlabs';
import { adjectives, animals, colors, uniqueNamesGenerator } from 'unique-names-generator';

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

  const sections = parsed.sections as DictationSection[];

  const promises = [];
  for (const section of sections) {
    for (const problem of section.problems) {
      promises.push(generateAudio(problem.numbers, 1));
    }
  }

  const audios = await Promise.all(promises);
  for (let i = 0; i < sections.length; i++) {
    for (let j = 0; j < sections[i].problems.length; j++) {
      sections[i].problems[j].audio = audios[i * sections[i].problems.length + j];
    }
  }

  return sections;
}

async function generateAudio(numbers: number[], breakTime: number): Promise<string> {
  const client = new ElevenLabsClient({
    apiKey: process.env.ELEVEN_LABS_API_KEY,
  });

  const text = numbers.map(n => n.toString()).join(` <break time="${breakTime}s" />`);

  const voiceId = 'zeTFANH8Ybln8sjiUtmJ'; //3vXjdKMDgxJoOLbElGxC';

  try {
    const response = await client.textToSpeech.convert(voiceId, {
      text: `${text}. <break time="1s" /> Answer is.`,
      model_id: 'eleven_turbo_v2',
      voice_settings: {
        speed: 0.7,
        stability: 0.4,
        similarity_boost: 0.5,
        style: 0,
      },
    });

    // Convert stream to buffer
    const chunks: Buffer[] = [];
    for await (const chunk of response) {
      chunks.push(Buffer.from(chunk));
    }
    const buffer = Buffer.concat(chunks);
    return buffer.toString('base64');
  } catch (error) {
    console.error('Error generating audio:', error);
    throw error;
  }
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
    id: uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      length: 3,
      separator: '-',
    }),
    createdAt: new Date(),
    sections,
  };

  revalidatePath('/abacus');

  return { success: true, error: null, dictation };
}
