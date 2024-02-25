'use client';

import { useGlobalContext } from '~/context';
import { Skeleton } from '../ui/skeleton';
import { sun } from '~/lib/icons';
import { UvProgress } from '../ui/uv-progress';

export default function UvIndex() {
  const { uvIndex } = useGlobalContext();

  if (!uvIndex || !uvIndex.daily) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { daily } = uvIndex;
  const { uv_index_clear_sky_max, uv_index_max } = daily;

  const uvIndexMax = uv_index_max[0].toFixed(0);

  const uvIndexCategory = (uvIndex: number) => {
    if (uvIndex <= 2) {
      return {
        text: 'Low',
        protection: 'No protection required',
      };
    } else if (uvIndex <= 5) {
      return {
        text: 'Moderate',
        protection: 'Stay in shade near midday.',
      };
    } else if (uvIndex <= 7) {
      return {
        text: 'High',
        protection: 'Wear a hat and sunglasses.',
      };
    } else if (uvIndex <= 10) {
      return {
        text: 'Very High',
        protection:
          'Apply sunscreen SPF 30+ every 2 hours.',
      };
    } else if (uvIndex > 10) {
      return {
        text: 'Extreme',
        protection: 'Avoid being outside.',
      };
    } else {
      return {
        text: 'Extreme',
        protection: 'Avoid being outside.',
      };
    }
  };

  const marginLeftPercentage = (uvIndexMax / 14) * 100;
  return (
    <div className="dark:bg-dark-grey flex h-[12rem] flex-col gap-5 rounded-lg border px-4 pb-5 pt-6 shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {sun} Uv Index
        </h2>
        <div className="flex flex-col gap-1 pt-4">
          <p className="text-2xl">
            {uvIndexMax}
            <span className="text-sm">
              ({uvIndexCategory(uvIndexMax).text})
            </span>
          </p>

          <UvProgress
            value={marginLeftPercentage}
            max={14}
            className="progress"
          />
        </div>
      </div>

      <p className="text-sm">
        {uvIndexCategory(uvIndexMax).protection}{' '}
      </p>
    </div>
  );
}
