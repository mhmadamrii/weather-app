'use client';

import { useGlobalContext } from '~/context';
import { people } from '~/lib/icons';
import { Skeleton } from '../ui/skeleton';
import { formatNumber } from '~/lib/degree';

export default function Population() {
  const { fiveDayForecast } = useGlobalContext();
  const { city } = fiveDayForecast;

  if (!fiveDayForecast || !city) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  return (
    <div className="dark:bg-dark-grey flex h-[12rem] flex-col gap-8 rounded-lg border px-4 pb-5 pt-6 shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {people} Population
        </h2>
        <p className="pt-4 text-2xl">
          {formatNumber(city.population)}
        </p>
      </div>
      <p className="text-sm">
        Latest UN population data for {city.name}.
      </p>
    </div>
  );
}
