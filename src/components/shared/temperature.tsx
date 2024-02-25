'use client';

import React, { useState, useEffect } from 'react';
import moment from 'moment';

import {
  clearSky,
  cloudy,
  drizzleIcon,
  navigation,
  rain,
  snow,
} from '~/lib/icons';
import { useGlobalContext } from '~/context';
import { kelvinToCelsius } from '~/lib/degree';

export default function Temperature() {
  const { forecast } = useGlobalContext();

  const { main, timezone, name, weather } = forecast;

  if (!forecast || !weather) {
    return <div>Loading...</div>;
  }

  const temp = kelvinToCelsius(main?.temp);
  const minTemp = kelvinToCelsius(main?.temp_min);
  const maxTemp = kelvinToCelsius(main?.temp_max);

  // State
  const [localTime, setLocalTime] = useState<string>('');
  const [currentDay, setCurrentDay] = useState<string>('');

  const { main: weatherMain, description } = weather[0];

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

  // Live time update
  useEffect(() => {
    // upadte time every second
    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(timezone / 60);
      // custom format: 24 hour format
      const formatedTime = localMoment.format('HH:mm:ss');
      // day of the week
      const day = localMoment.format('dddd');

      setLocalTime(formatedTime);
      setCurrentDay(day);
    }, 1000);

    // clear interval
    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div
      className="dark:bg-dark-grey flex flex-col justify-between rounded-lg border px-4 
        pb-5 pt-6 shadow-sm dark:shadow-none"
    >
      <p className="flex items-center justify-between">
        <span className="font-medium">{currentDay}</span>
        <span className="font-medium">{localTime}</span>
      </p>
      <p className="flex gap-1 pt-2 font-bold">
        <span>{name}</span>
        <span>{navigation}</span>
      </p>
      <p className="self-center py-10 text-9xl font-bold">
        {temp}°
      </p>

      <div>
        <div>
          <span>{getIcon()}</span>
          <p className="pt-2 text-lg font-medium capitalize">
            {description}
          </p>
        </div>
        <p className="flex items-center gap-2">
          <span>Low: {minTemp}°</span>
          <span>High: {maxTemp}°</span>
        </p>
      </div>
    </div>
  );
}
