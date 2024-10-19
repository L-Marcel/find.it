"use client";

import { useEffect, useMemo, useState } from "react";
import { Selector } from "../selector";
import useSearchCities, { cityToString } from "@/context/cities";

export default function CitySelector() {
  const { cities, setCity } = useSearchCities();
  const [selected, setSelected] = useState<number>(-1);

  const options = useMemo(() => {
    return cities.map((city) => cityToString(city));
  }, [cities]);

  useEffect(() => {
    if (selected == -1) {
      const city = cities.find((city) => cityToString(city) === "Natal - RN");
      if (city) setSelected(cities.indexOf(city));
    }
  }, [cities, selected]);

  return (
    <Selector
      options={options}
      selected={selected}
      onChange={(value) => {
        const city = options[value];
        const [name, state] = city.split(" - ");
        setCity({ name, state });
        setSelected(value);
      }}
    />
  );
}
