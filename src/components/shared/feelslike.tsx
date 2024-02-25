'use client';

import { kelvinToCelsius } from '~/lib/degree';
import { thermometer } from '~/lib/icons';
import { Skeleton } from '../ui/skeleton';
import { useGlobalContext } from '~/context';

export default function FeelsLike() {
  const { forecast } = useGlobalContext();

  if (
    !forecast ||
    !forecast?.main ||
    !forecast?.main?.feels_like
  ) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { feels_like, temp_min, temp_max } = forecast?.main;

  const feelsLikeText = (
    feelsLike: number,
    minTemo: number,
    maxTemp: number,
  ) => {
    const avgTemp = (minTemo + maxTemp) / 2;

    if (feelsLike < avgTemp - 5) {
      return 'Feels significantly colder than actual temperature.';
    }
    if (
      feelsLike > avgTemp - 5 &&
      feelsLike <= avgTemp + 5
    ) {
      return 'Feels close to the actual temperature.';
    }
    if (feelsLike > avgTemp + 5) {
      return 'Feels significantly warmer than actual temperature.';
    }

    return 'Temperature feeling is typical for this range.';
  };

  const feelsLikeDescription = feelsLikeText(
    feels_like,
    temp_min,
    temp_max,
  );

  return (
    <div className="dark:bg-dark-grey flex h-[12rem] flex-col gap-8 rounded-lg border px-4 pb-5 pt-6 shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {thermometer} Feels Like
        </h2>
        <p className="pt-4 text-2xl">
          {kelvinToCelsius(feels_like)}°
        </p>
      </div>

      <p className="text-sm">{feelsLikeDescription}</p>
    </div>
  );
}
