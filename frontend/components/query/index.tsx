"use client";

import useSearchCities, { cityToString } from "@/context/cities";
import { Item } from "@/context/items";
import useSearchQuery from "@/context/query";
import { useInfiniteQuery } from "@tanstack/react-query";

import "./index.scss";
import Masonry from "./masonry";
import useFilters from "@/context/filters";

export default function Query() {
  const { donateds, finds, losts } = useFilters();
  const { query } = useSearchQuery();
  const { city } = useSearchCities();

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryFn: async ({ pageParam }) => {
      return fetch(
        `${process.env.API_URL}/items/${city.state}/${city.name}?query=${query}&page=${pageParam}&finds=${finds}&losts=${losts}&donateds=${donateds}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        }
      ).then((res) => res.json() as Promise<Item[]>);
    },
    queryKey: [cityToString(city), query, donateds, finds, losts],
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages, lastPageParam) =>
      lastPage.length >= 10 ? lastPageParam + 1 : undefined,
    throwOnError: false,
  });

  const items = data?.pages.flat() ?? [];

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
