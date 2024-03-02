'use client';

import { useGlobalContext } from '~/context';
import { kelvinToCelsius, unixToDay } from '~/lib/degree';
import { Skeleton } from '../ui/skeleton';
import { calender } from '~/lib/icons';

export default function FiveDayForecast() {
  const { fiveDayForecast } = useGlobalContext();

  const { city, list } = fiveDayForecast;

  if (
    !fiveDayForecast ||
    !fiveDayForecast?.data?.city ||
    !fiveDayForecast?.data?.list
  ) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const processData = (
    dailyData: {
      main: { temp_min: number; temp_max: number };
      dt: number;
    }[],
  ) => {
    let minTemp = Number.MAX_VALUE;
    let maxTemp = Number.MIN_VALUE;

    dailyData.forEach(
      (day: {
        main: { temp_min: number; temp_max: number };
        dt: number;
      }) => {
        if (day.main.temp_min < minTemp) {
          minTemp = day.main.temp_min;
        }
        if (day.main.temp_max > maxTemp) {
          maxTemp = day.main.temp_max;
        }
      },
    );

    return {
      day: unixToDay(dailyData[0].dt),
      minTemp: kelvinToCelsius(minTemp),
      maxTemp: kelvinToCelsius(maxTemp),
    };
  };

  const dailyForecasts = [];

  for (let i = 0; i < 40; i += 8) {
    const dailyData = fiveDayForecast?.data?.list.slice(
      i,
      i + 5,
    );
    dailyForecasts.push(processData(dailyData));
  }

  return (
    <div
      className="dark:bg-dark-grey flex flex-1 flex-col justify-between rounded-lg border px-4
      pb-5 pt-6 shadow-sm dark:shadow-none"
    >
      <div>
        <h2 className="flex items-center gap-2 font-medium">
          {calender} 5-Day Forecast for{' '}
          {fiveDayForecast?.data?.city.name}
        </h2>

        <div className="forecast-list pt-3">
          {dailyForecasts.map((day, i) => {
            return (
              <div
                key={i}
                className="daily-forevast flex flex-col justify-evenly border-b-2 py-4"
              >
                <p className="min-w-[3.5rem] text-xl">
                  {day.day}
                </p>
                <p className="flex justify-between text-sm">
                  <span>(low)</span>
                  <span>(high)</span>
                </p>

                <div className="flex flex-1 items-center justify-between gap-4">
                  <p className="font-bold">
                    {day.minTemp}°C
                  </p>
                  <div className="temperature h-2 w-full flex-1 rounded-lg"></div>
                  <p className="font-bold">
                    {day.maxTemp}°C
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
