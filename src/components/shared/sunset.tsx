'use client';

import React from 'react';

import { useGlobalContext } from '~/context';
import { sunset } from '~/lib/icons';
import { unixToDay, unixToTime } from '~/lib/degree';
import { Skeleton } from '../ui/skeleton';

export default function Sunset() {
  const { forecast } = useGlobalContext();

  if (
    !forecast ||
    !forecast?.sys ||
    !forecast?.sys?.sunset
  ) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const times = forecast?.sys?.sunset;
  const timezone = forecast?.timezone;

  const sunsetTime = unixToTime(times, timezone);
  const sunrise = unixToTime(
    forecast?.sys?.sunrise,
    timezone,
  );

  return (
    <div className="dark:bg-dark-grey flex h-[12rem] flex-col gap-8 rounded-lg border px-4 pb-5 pt-6 shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {sunset}Sunset
        </h2>
        <p className="pt-4 text-2xl">{sunsetTime}</p>
      </div>

      <p className="text-sm">Sunrise: {sunrise}</p>
    </div>
  );
}
