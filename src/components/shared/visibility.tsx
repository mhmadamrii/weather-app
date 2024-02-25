'use client';

import { useGlobalContext } from '~/context';
import { Skeleton } from '../ui/skeleton';
import { eye } from '~/lib/icons';

export default function Visibility() {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.visibility) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { visibility } = forecast;

  const getVisibilityDescription = (visibility: number) => {
    const visibilityInKm = Math.round(visibility / 1000);

    if (visibilityInKm > 10)
      return 'Excellent: Clear and vast view';
    if (visibilityInKm > 5) return 'Good: Easily navigable';
    if (visibilityInKm > 2)
      return 'Moderate: Some limitations';
    if (visibilityInKm <= 2)
      return 'Poor: Restricted and unclear';
    return 'Unavailable: Visibility data not available';
  };

  return (
    <div className="dark:bg-dark-grey flex h-[12rem] flex-col gap-8 rounded-lg border px-4 pb-5 pt-6 shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {eye} Visibility
        </h2>
        <p className="pt-4 text-2xl">
          {Math.round(visibility / 1000)} km
        </p>
      </div>

      <p className="text-sm">
        {getVisibilityDescription(visibility)}.
      </p>
    </div>
  );
}
