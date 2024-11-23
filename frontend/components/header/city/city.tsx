"use client";

import { useEffect, useState } from "react";
import { Selector } from "../../selector";
import useSearchCities from "@/context/cities";

interface CitySelectorProps {
  small?: boolean;
}

export default function CitySelector({ small = false }: CitySelectorProps) {
  const { cities, city, setCity } = useSearchCities();
  const [selected, setSelected] = useState<number>(-1);

  useEffect(() => {
    if (selected == -1 && city) {
      setSelected(cities.indexOf(city));
    }
  }, [cities, selected, setSelected, city]);

  return (
    <Selector
      small={small}
      options={cities}
      selected={selected}
      onChange={(index) => {
        const city = cities[index];
        setCity(city);
        setSelected(index);
      }}
    />
  );
}
