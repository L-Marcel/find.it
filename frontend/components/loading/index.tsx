"use client";

import { useIsLoading } from "@/context/loading";
import styles from "./index.module.scss";
import { useIsFetching } from "@tanstack/react-query";
import { useThrottle } from "@uidotdev/usehooks";

export default function Loading() {
  const isLoading = useIsLoading();
  const isFecthing = useThrottle(useIsFetching(), 1000);

  const loading = isLoading || isFecthing;

  if (loading) return <span className={styles.loading} />;
  else return null;
}
