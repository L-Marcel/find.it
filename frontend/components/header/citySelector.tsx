"use client";

import { useMemo } from "react";
import { Selector } from "../selector";
import useSearchCities, { cityToString } from "@/context/cities";

export default function CitySelector() {
  const { cities, city, setCity } = useSearchCities();

  const options = useMemo(() => {
    return cities.map((city) => cityToString(city));
  }, [cities]);

  return (
    <Selector
      options={options}
      selected={cityToString(city)}
      onChange={(value) => {
        const [name, state] = value.split(" - ");
        setCity({ name, state });
      }}
    />
  );
}
