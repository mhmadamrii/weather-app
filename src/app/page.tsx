'use client';

import AirPollution from '~/components/shared/air-pollution';
import DailyForecast from '~/components/shared/daily-forecast';
import FeelsLike from '~/components/shared/feelslike';
import FiveDayForecast from '~/components/shared/five-days-forecast';
import Humidity from '~/components/shared/humidity';
import Mapbox from '~/components/shared/mapbox';
import Navbar from '~/components/shared/navbar';
import Population from '~/components/shared/population';
import Pressure from '~/components/shared/pressure';
import Sunset from '~/components/shared/sunset';
import Temperature from '~/components/shared/temperature';
import UvIndex from '~/components/shared/uv-index';
import Visibility from '~/components/shared/visibility';
import Wind from '~/components/shared/wind';

import { useGlobalContextUpdate } from '~/context';
import { defaultStates } from '~/lib/utils';

export default function Home() {
  const { setActiveCityCoords } = useGlobalContextUpdate();

  const getClickedCityCords = (
    lat: number,
    lon: number,
  ): void => {
    setActiveCityCoords([lat, lon]);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <main className="m-auto mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem]">
      <Navbar />

      <div className="flex flex-col gap-4 pb-4 md:flex-row">
        <div className="flex w-full min-w-[18rem] flex-col gap-4 md:w-[35rem]">
          <Temperature />
          <FiveDayForecast />
        </div>
      </div>

      <div className="flex w-full flex-col">
        <div className="instruments sm-2:col-span-2 col-span-full grid h-full gap-4 lg:grid-cols-3 xl:grid-cols-4">
          <AirPollution />
          <Sunset />
          <Wind />
          <DailyForecast />
          <UvIndex />
          <Population />
          <FeelsLike />
          <Humidity />
          <Visibility />
          <Pressure />
        </div>
        <div className="mapbox-con mt-4 flex gap-4">
          <Mapbox />
          <div className="states flex flex-1 flex-col gap-3">
            <h2 className="flex items-center gap-2 font-medium">
              Top Large Cities
            </h2>
            <div className="flex flex-col gap-4">
              {defaultStates.map((state, index) => {
                return (
                  <div
                    key={index}
                    className="dark:bg-dark-grey cursor-pointer rounded-lg border shadow-sm dark:shadow-none"
                    onClick={() => {
                      getClickedCityCords(
                        state.lat,
                        state.lon,
                      );
                    }}
                  >
                    <p className="px-6 py-4">
                      {state.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
