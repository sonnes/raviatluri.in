import Image from 'next/image';

import { BriefcaseIcon } from '@heroicons/react/24/outline';

import resume from '@/content/resume';

export default function Resume() {
  return (
    <div className="rounded-2xl border border-border p-6">
      <h2 className="flex text-lg font-semibold text-text-primary">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-text-primary/5 ring-1 ring-border-subtle">
              <Image src={role.logo} alt="" className="h-9 w-9" unoptimized />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-md font-semibold text-text-primary">
                {role.company}
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="text-sm text-text-tertiary">{role.title}</dd>
              <dt className="sr-only">Date</dt>
              <dd
                className="ml-auto text-sm text-text-muted"
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
