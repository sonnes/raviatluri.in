import { NextRequest } from 'next/server';

import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const title = searchParams.get('title');
  const subtitle = searchParams.get('subtitle');

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundImage: 'url(https://raviatluri.in/og-bg.png)',
        }}
      >
        <div tw="flex font-sans">
          <div tw="flex flex-col md:flex-row w-full p-16 md:items-center justify-between">
            <h2 tw="flex flex-col m-8 p-16 text-7xl tracking-tight text-gray-600 text-left">
              <span tw="text-red-600 font-bold">{title}</span>
              <span tw="text-5xl">{subtitle}</span>
            </h2>
          </div>
        </div>
      </div>
    ),
    {
      width: 1920,
      height: 1080,
    }
  );
}
