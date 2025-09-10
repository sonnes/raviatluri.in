import Image from 'next/image';

import { BriefcaseIcon } from '@heroicons/react/24/outline';

import resume from '@/content/resume';

export default function Resume() {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6">
      <h2 className="flex text-lg font-semibold text-zinc-900">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5">
              <Image src={role.logo} alt="" className="h-9 w-9" unoptimized />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-md font-semibold text-zinc-900">
                {role.company}
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="text-sm text-zinc-500">{role.title}</dd>
              <dt className="sr-only">Date</dt>
              <dd
                className="ml-auto text-sm text-zinc-400"
                aria-label={`${role.start} until ${role.current ? 'Present' : role.end}`}
              >
                <time dateTime={role.start}>{role.start}</time> <span aria-hidden="true">—</span>{' '}
                <time dateTime={role.end}>{role.current ? 'Present' : role.end}</time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
    </div>
  );
}
