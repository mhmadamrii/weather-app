'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { github } from '~/lib/icons';

import SearchDialog from './search';
import ThemeDropdown from './theme-dropdown';

export default function Navbar() {
  const router = useRouter();

  return (
    <div className="flex w-full items-center justify-between py-4">
      <div className="left"></div>
      <div className="search-container flex w-full shrink-0 gap-2 sm:w-fit">
        <SearchDialog />

        <div className="btn-group flex items-center gap-2">
          <ThemeDropdown />

          <Button
            className="source-code-btn flex items-center gap-2"
            onClick={() => {
              router.push(
                'https://github.com/mhmadamrii/weather-app',
              );
            }}
          >
            {github} Source Code
          </Button>
        </div>
      </div>
    </div>
  );
}
