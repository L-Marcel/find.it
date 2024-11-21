"use client";

import useSearchCities from "@/context/cities";
import { Item } from "@/context/items";
import useSearchQuery from "@/context/query";
import { useInfiniteQuery } from "@tanstack/react-query";

import "./index.scss";
import Masonry from "./masonry";
import useFilters from "@/context/filters";
import { useDebounce } from "@uidotdev/usehooks";

export default function Query() {
  const { donateds, finds, losts } = useFilters();
  const { query } = useSearchQuery();
  const { city: _city } = useSearchCities();

  const parts = _city.split(" - ");
  const city = parts[0];
  const state = parts[1];

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryFn: async ({ pageParam }) => {
      return fetch(
        `${process.env.API_URL}/items/${state}/${city}?query=${query}&page=${pageParam}&finds=${finds}&losts=${losts}&donateds=${donateds}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      ).then((res) => res.json() as Promise<Item[]>);
    },
    retry: false,
    queryKey: [_city, query, donateds, finds, losts],
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.length >= 10 ? lastPageParam + 1 : undefined,
    throwOnError: false,
  });

  const items = useDebounce(data?.pages.flat() || [], 100);

  return (
    <section>
      <Masonry
        items={items}
        fetching={isFetching}
        onEnd={() => {
          if (hasNextPage) fetchNextPage();
        }}
      />
    </section>
  );
}
