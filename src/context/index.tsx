'use client';

import axios from 'axios';
import React, {
  useContext,
  createContext,
  useState,
  useEffect,
} from 'react';

import { debounce } from 'lodash';
import { defaultStates } from '~/lib/utils';

type TForecast = {
  main?: string;
  timezone?: any;
  name?: string;
  weather?: {
    main: string;
  };
};

type TGlobalContext = {
  geoCodedList: any;
  inputValue: any;
  forecast: TForecast;
  airQuality: {};
  fiveDayForecast: {};
  uvIndex: {};
  handleInput: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  setActiveCityCoords: React.Dispatch<
    React.SetStateAction<number[]>
  >;
};

type TGlobalContextUpdate = {
  setActiveCityCoords: any;
};

const GlobalContext = createContext<TGlobalContext>({
  forecast: {},
  airQuality: {},
  fiveDayForecast: {},
  uvIndex: {},
  setActiveCityCoords: () => {},
  geoCodedList: undefined,
  inputValue: undefined,
  handleInput: function (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void {
    throw new Error('Function not implemented.');
  },
});

const GlobalContextUpdate =
  // @ts-ignore
  createContext<TGlobalContextUpdate>({});

export const GlobalContextProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [forecast, setForecast] = useState({});
  const [geoCodedList, setGeoCodedList] =
    useState(defaultStates);
  const [inputValue, setInputValue] = useState('');

  const [activeCityCoords, setActiveCityCoords] = useState<
    number[]
  >([51.752021, -1.257726]);

  const [airQuality, setAirQuality] = useState({});
  const [fiveDayForecast, setFiveDayForecast] = useState(
    {},
  );
  const [uvIndex, seUvIndex] = useState({});

  const fetchForecast = async (lat: any, lon: any) => {
    try {
      const res = await axios.get(
        `api/weather?lat=${lat}&lon=${lon}`,
      );

      setForecast(res.data);
    } catch (error: any) {
      console.log(
        'Error fetching forecast data: ',
        error.message,
      );
    }
  };

  // Air Quality
  const fetchAirQuality = async (lat: any, lon: any) => {
    try {
      const res = await axios.get(
        `api/pollution?lat=${lat}&lon=${lon}`,
      );
      setAirQuality(res.data);
    } catch (error: any) {
      console.log(
        'Error fetching air quality data: ',
        error.message,
      );
    }
  };

  // five day forecast
  const fetchFiveDayForecast = async (
    lat: any,
    lon: any,
  ) => {
    try {
      const res = await axios.get(
        `api/fiveday?lat=${lat}&lon=${lon}`,
      );

      setFiveDayForecast(res.data);
    } catch (error: any) {
      console.log(
        'Error fetching five day forecast data: ',
        error.message,
      );
    }
  };

  //geocoded list
  const fetchGeoCodedList = async (search: string) => {
    try {
      const res = await axios.get(
        `/api/geocoded?search=${search}`,
      );

      setGeoCodedList(res.data);
    } catch (error: any) {
      console.log(
        'Error fetching geocoded list: ',
        error.message,
      );
    }
  };

  //fetch uv data
  const fetchUvIndex = async (lat: number, lon: number) => {
    try {
      const res = await axios.get(
        `/api/uv?lat=${lat}&lon=${lon}`,
      );

      seUvIndex(res.data);
    } catch (error) {
      console.error('Error fetching the forecast:', error);
    }
  };

  // handle input
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputValue(e.target.value);

    if (e.target.value === '') {
      setGeoCodedList(defaultStates);
    }
  };

  // debounce function
  useEffect(() => {
    const debouncedFetch = debounce((search: string) => {
      fetchGeoCodedList(search);
    }, 500);

    if (inputValue) {
      debouncedFetch(inputValue);
    }

    // cleanup
    return () => debouncedFetch.cancel();
  }, [inputValue]);

  useEffect(() => {
    fetchForecast(activeCityCoords[0], activeCityCoords[1]);
    fetchAirQuality(
      activeCityCoords[0],
      activeCityCoords[1],
    );
    fetchFiveDayForecast(
      activeCityCoords[0],
      activeCityCoords[1],
    );
    fetchUvIndex(activeCityCoords[0], activeCityCoords[1]);
  }, [activeCityCoords]);

  return (
    <GlobalContext.Provider
      value={{
        forecast,
        airQuality,
        fiveDayForecast,
        uvIndex,
        geoCodedList,
        inputValue,
        handleInput,
        setActiveCityCoords,
      }}
    >
      <GlobalContextUpdate.Provider
        value={{
          setActiveCityCoords,
        }}
      >
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () =>
  useContext(GlobalContext);
export const useGlobalContextUpdate = () =>
  useContext(GlobalContextUpdate);
