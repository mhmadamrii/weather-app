'use client';

import React from 'react';

import {
  useGlobalContext,
  useGlobalContextUpdate,
} from '~/context';

import { Button } from '../ui/button';
import { commandIcon } from '~/lib/icons';
import { Command, CommandInput } from '../ui/command';

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '../ui/dialog';

export default function SearchDialog() {
  const { geoCodedList, inputValue, handleInput } =
    useGlobalContext();
  const { setActiveCityCoords } = useGlobalContextUpdate();

  const [hoveredIndex, setHoveredIndex] =
    React.useState<number>(0);

  const getClickedCoords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="inline-flex items-center justify-center border text-sm font-medium duration-200 ease-in-out  hover:bg-slate-100 hover:dark:bg-[#131313]"
        >
          <p className="text-sm text-muted-foreground">
            Search Here...
          </p>
          <div className="command ml-[10rem] flex  items-center gap-2 rounded-sm bg-slate-200 py-[2px] pl-[5px] pr-[7px] dark:bg-[#262626]">
            {commandIcon}
            <span className="text-[9px]">F</span>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="p-0">
        <Command className=" rounded-lg border shadow-md">
          <CommandInput
            value={inputValue}
            onChangeCapture={handleInput}
            placeholder="Type a command or search..."
          />
          <ul className="px-3 pb-2">
            <p className="p-2 text-sm text-muted-foreground">
              Suggestions
            </p>

            {geoCodedList?.length === 0 ||
              (!geoCodedList && <p>No Results</p>)}

            {geoCodedList &&
              geoCodedList.map(
                (
                  item: {
                    name: string;
                    country: string;
                    state: string;
                    lat: number;
                    lon: number;
                  },
                  index: number,
                ) => {
                  const { country, state, name } = item;
                  return (
                    <li
                      key={index}
                      onMouseEnter={() =>
                        setHoveredIndex(index)
                      }
                      className={`cursor-default rounded-sm px-2  py-3 text-sm
                        ${hoveredIndex === index ? 'bg-accent' : ''}
                      `}
                      onClick={() => {
                        getClickedCoords(
                          item.lat,
                          item.lon,
                        );
                      }}
                    >
                      <p className=" text">
                        {name}, {state && state + ','}{' '}
                        {country}
                      </p>
                    </li>
                  );
                },
              )}
          </ul>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
