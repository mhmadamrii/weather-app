'use client';

import { useGlobalContext } from '~/context';
import { Skeleton } from '../ui/skeleton';
import { gauge } from '~/lib/icons';

export default function Pressure() {
  const { forecast } = useGlobalContext();

  if (
    !forecast ||
    !forecast?.main ||
    !forecast?.main?.pressure
  ) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { pressure } = forecast?.main;

  const getPressureDescription = (pressure: number) => {
    if (pressure < 1000) return 'Very low pressure';

    if (pressure >= 1000 && pressure < 1015)
      return 'Low pressure. Expect weather changes.';

    if (pressure >= 1015 && pressure < 1025)
      return 'Normal pressure. Expect weather changes.';

    if (pressure >= 1025 && pressure < 1040)
      return 'High pressure. Expect weather changes.';

    if (pressure >= 1040)
      return 'Very high pressure. Expect weather changes.';

    return 'Unavailable pressure data';
  };

  return (
    <div className="dark:bg-dark-grey flex h-[12rem] flex-col gap-8 rounded-lg border px-4 pb-5 pt-6 shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {gauge} Pressure
        </h2>
        <p className="pt-4 text-2xl">{pressure} hPa</p>
      </div>

      <p className="text-sm">
        {getPressureDescription(pressure)}.
      </p>
    </div>
  );
}
