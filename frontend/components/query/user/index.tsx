"use client";

import { Item } from "@/context/items";
import useSearchQuery from "@/context/query";
import { useInfiniteQuery } from "@tanstack/react-query";

import Masonry from "../masonry";
import useFilters from "@/context/filters";
import { useDebounce } from "@uidotdev/usehooks";

interface UserQueryProps {
  userId: string;
}

export default function UserQuery({ userId }: UserQueryProps) {
  const { donateds, finds, losts } = useFilters();
  const { query } = useSearchQuery();

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryFn: async ({ pageParam }) => {
      return fetch(
        `${process.env.API_URL}/users/${userId}/items?query=${query}&page=${pageParam}&finds=${finds}&losts=${losts}&donateds=${donateds}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      ).then((res) => res.json() as Promise<Item[]>);
    },
    retry: false,
    queryKey: [userId, query, donateds, finds, losts],
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
