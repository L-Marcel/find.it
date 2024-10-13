"use client";

import useSearchCities, { cityToString } from "@/context/cities";
import { Item } from "@/context/items";
import useSearchQuery from "@/context/query";
import { useInfiniteQuery } from "@tanstack/react-query";

import "./index.scss";
import Masonry from "./masonry";

export default function Query() {
  const { query } = useSearchQuery();
  const { city } = useSearchCities();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryFn: async ({ pageParam }) => {
      return fetch(
        `${process.env.API_URL}/items/${city.state}/${city.name}?query=${query}&page=${pageParam}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        }
      ).then((res) => res.json() as Promise<Item[]>);
    },
    queryKey: [cityToString(city), query],
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages, lastPageParam) =>
      lastPage.length >= 10 ? lastPageParam + 1 : undefined,
    throwOnError: false,
  });

  const rows = new Array(10000)
    .fill(true)
    .map(() => 25 + Math.round(Math.random() * 100));

  return (
    <section>
      <p>{isFetching && "fetching..."}</p>
      <Masonry rows={rows} />
    </section>
  );
}
