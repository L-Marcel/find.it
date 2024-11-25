import { useContextSelector } from "use-context-selector";
import { context } from "./provider";
import { searchContext } from "./search";

export type City = { name: string; state: string };

//#region Fetch
export function getCities(): Promise<City[]> {
  return new Promise(async (resolve, reject) => {
    const states = await fetch(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados",
      {
        next: {
          revalidate: 60 * 60 * 24,
        },
      }
    )
      .then(async (response) => {
        if (response.ok) return await response.json();
        reject("Failed to fetch states");
      })
      .then((states: { sigla: string }[]) => {
        return states.map(({ sigla }) => sigla);
      });

    const cities = await Promise.all(
      states.map(async (state) => {
        return await fetch(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`,
          {
            next: {
              revalidate: 60 * 60 * 24,
            },
          }
        )
          .then(async (response) => {
            if (response.ok) return await response.json();
            reject(`Failed to fetch cities from ${state}`);
          })
          .then((cities: { nome: string }[]) =>
            cities.map(({ nome }) => ({ name: nome, state }) as City)
          );
      })
    ).then((cities) =>
      cities.flat().sort((a, b) => a.name.localeCompare(b.name))
    );

    resolve(cities);
  });
}
//#endregion

export default function useSearchCities() {
  const cities = useContextSelector(context, (context) => context.cities);
  const { city, setCity } = useContextSelector(searchContext, (context) => ({
    city: context.city,
    setCity: context.setCity,
  }));

  return {
    cities,
    city,
    setCity,
  };
}

export function useCity() {
  return useContextSelector(searchContext, (context) => context.city);
}

export function cityToString(city: City) {
  return `${city.name} - ${city.state}`;
}
