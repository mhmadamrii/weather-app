'use client';

import moment from 'moment';
import { useGlobalContext } from '~/context';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '../ui/carousel';
import { Skeleton } from '../ui/skeleton';
import {
  clearSky,
  cloudy,
  drizzleIcon,
  rain,
  snow,
} from '~/lib/icons';
import { kelvinToCelsius } from '~/lib/degree';

export default function DailyForecast() {
  const { forecast, fiveDayForecast } = useGlobalContext();
  // console.log('forecast', forecast);
  // console.log('fivedaily', fiveDayForecast);

  const { weather } = forecast;
  const { city, list } = fiveDayForecast;

  if (
    !fiveDayForecast ||
    !fiveDayForecast?.data?.city ||
    !fiveDayForecast?.data?.list
  ) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  if (!forecast || !weather) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const today = new Date();
  const todayString = today.toISOString().split('T')[0];

  //filter the list for today's forecast
  const todaysForecast = fiveDayForecast?.data?.list.filter(
    (forecast: {
      dt_txt: string;
      main: { temp: number };
    }) => {
      return forecast.dt_txt.startsWith(todayString);
    },
  );

  const { main: weatherMain } = weather[0];

  if (todaysForecast.length < 1) {
    return (
      <Skeleton className="sm-2:col-span-2 col-span-full h-[12rem] w-full md:col-span-2 xl:col-span-2" />
    );
  }

  const getIcon = () => {
    switch (weatherMain) {
      case 'Drizzle':
        return drizzleIcon;
      case 'Rain':
        return rain;
      case 'Snow':
        return snow;
      case 'Clear':
        return clearSky;
      case 'Clouds':
        return cloudy;
      default:
        return clearSky;
    }
  };

  return (
    <div className="dark:bg-dark-grey sm-2:col-span-2 col-span-full flex h-[12rem] flex-col gap-8 rounded-lg border px-4 pt-6 shadow-sm dark:shadow-none md:col-span-2 xl:col-span-2">
      <div className="flex h-full gap-10 overflow-hidden">
        {todaysForecast.length < 1 ? (
          <div className="flex items-center justify-center">
            <h1 className="text-[3rem] text-rose-500 line-through">
              No Data Available!
            </h1>
          </div>
        ) : (
          <div className="w-full">
            <Carousel>
              <CarouselContent>
                {todaysForecast.map(
                  (forecast: {
                    dt_txt: string;
                    main: { temp: number };
                  }) => {
                    return (
                      <CarouselItem
                        key={forecast.dt_txt}
                        className="flex basis-[8.5rem] cursor-grab flex-col gap-4"
                      >
                        <p className=" text-gray-300">
                          {moment(forecast.dt_txt).format(
                            'HH:mm',
                          )}
                        </p>
                        <p>{getIcon()}</p>
                        <p className="mt-4">
                          {kelvinToCelsius(
                            forecast.main.temp,
                          )}
                          °C
                        </p>
                      </CarouselItem>
                    );
                  },
                )}
              </CarouselContent>
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
}
