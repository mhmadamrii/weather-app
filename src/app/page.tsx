'use client';

import Image from 'next/image';
import Navbar from '~/components/shared/navbar';
import { useGlobalContextUpdate } from '~/context';

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

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Quaerat, est beatae. Corrupti accusamus
        provident voluptatibus nostrum exercitationem ab
        doloribus quibusdam culpa dolor? Omnis
        necessitatibus cupiditate ad quas ab quae ut?
      </p>
    </main>
  );
}
