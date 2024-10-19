"use client";

import { isLoading } from "@/context/loading";
import "./index.scss";
import { useIsFetching } from "@tanstack/react-query";

export default function Loading() {
  const _isLoading = isLoading();
  const isFecthing = useIsFetching();

  const loading = _isLoading || isFecthing;

  if (loading) return <span className="loading" />;
  else return null;
}
