"use client";

import { useMemo } from "react";
import { Selector } from "../selector";
import useCities, { cityToString } from "@/context/cities";

export default function CitySelector() {
  const { cities, city, setCity } = useCities();

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
