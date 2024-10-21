"use client";

import { useIsLoading } from "@/context/loading";
import "./index.scss";
import { useIsFetching } from "@tanstack/react-query";

export default function Loading() {
  const isLoading = useIsLoading();
  const isFecthing = useIsFetching();

  const loading = isLoading || isFecthing;

  if (loading) return <span className="loading" />;
  else return null;
}
