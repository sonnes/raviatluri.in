import { ReactNode } from 'react';
import React from 'react';

import Link from 'next/link';

import clsx from 'clsx';
import { timeline } from 'contentlayer/generated';
import type { Event } from 'contentlayer/generated';
import moment from 'moment';
import type { Metadata } from 'next';

import { Header, Tooltip } from '@/components/life_sections';
import { SimpleLayout } from '@/components/simple_layout';

export const metadata: Metadata = {
  title: 'Life',
  description: 'A visual representation of my life so far',
};

export default function Life() {
  const start_date = '1986-09-01';
  const end_year = moment().year() + 1;

  const data = new Map<string, Event[]>();

  timeline.events.forEach((event) => {
    const date =
      event.date.length === 7
        ? moment(event.date, 'YYYY-MM')
        : moment(event.date, 'YYYY-MM-DD');

    const key = date.format('YYYY-MM-DD');

    if (!data.has(key)) {
      data.set(key, []);
    }

    data.get(key)?.push(event);
  });

  const startDate = moment(start_date);
  const startYear = startDate.year();
  const startMonth = startDate.month() + 1;
  const startDay = startDate.date();

  return (
    <SimpleLayout title="Life">
      <div className="my-4 px-2 py-4 bg-amber-50 text-amber-700 font-bold">
        This is a work in progress.
      </div>
      <div>
        A visual representation of events, milestones, memories, and other big
        phases of my life. Inspired by{' '}
        <Link
          className="text-red-500 hover:underline"
          href="https://busterbenson.com/life-in-weeks"
        >
          Life in Weeks by Buster Benson
        </Link>
        ,{' '}
        <Link
          className="text-red-500 hover:underline"
          href="https://waitbutwhy.com/2014/05/life-weeks.html"
        >
          Life in Weeks by Tim Urban
        </Link>
        , and{' '}
        <Link
          className="text-red-500 hover:underline"
          href="https://days.rory.codes/"
        >
          Day by Day by Rory
        </Link>
        .
      </div>
      <div className="row justify-content-center">
        <div className="col-12">
          {[...Array(end_year - startYear + 1)].map((_, i) => {
            const year = startYear + i;
            const thisYear = moment(
              `${year}-${startMonth}-${startDay}`,
              'YYYY-MM-DD'
            );
            const nextYear = moment(
              `${year + 1}-${startMonth}-${startDay}`,
              'YYYY-MM-DD'
            );
            const age = year - startYear;
            const ageModulo = age % 10;

            return (
              <>
                {ageModulo === 0 && <Header age={age} />}
                <div className="h-8 px-1 py-1 m-0.5 bg-gray-100 border border-gray float-left text-truncate text-gray-400 text-sm font-bold">
                  {year}
                </div>

                {[...Array(54)].map((_, j) => {
                  const weekStart = thisYear
                    .clone()
                    .isoWeek(j + 1)
                    .startOf('week');

                  return (
                    <div
                      key={j}
                      className="h-8 px-1 py-1 m-0.5 border border-gray float-left text-truncate text-gray-600 text-sm rounded-sm hover:bg-red-50 hover:border-red-300"
                    >
                      {[...Array(7)].map((_, k) => {
                        const specificDate = weekStart.clone().add(k, 'day');

                        const key = specificDate.format('YYYY-MM-DD');
                        const events = data.get(key) || [];
                        if (specificDate < nextYear && events.length > 0) {
                          return events.map((event) => (
                            <Tooltip
                              key={event.title}
                              message={`Week of ${weekStart.format(
                                'MMM Do, YYYY'
                              )}`}
                            >
                              <div>{event.title}</div>
                            </Tooltip>
                          ));
                        }

                        return (
                          <div key={k} className="w-6">
                            {' '}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </>
            );
          })}
        </div>
      </div>
      <br className="clear-both" />
    </SimpleLayout>
  );
}
