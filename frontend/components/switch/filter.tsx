"use client";

import useFilters from "@/context/filters";
import Switch from ".";
import { useCallback, useRef } from "react";
import "./index.scss";
import { useDraggable } from "react-use-draggable-scroll";

export default function Filter() {
  const ref = useRef<HTMLDivElement>(
    null
  ) as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);
  const { setFilters, finds, losts, donateds } = useFilters();

  const switchFinds = useCallback(() => {
    setFilters((filters) => ({ ...filters, finds: !filters.finds }));
  }, [setFilters]);

  const switchLosts = useCallback(() => {
    setFilters((filters) => ({ ...filters, losts: !filters.losts }));
  }, [setFilters]);

  const switchDonateds = useCallback(() => {
    setFilters((filters) => ({ ...filters, donateds: !filters.donateds }));
  }, [setFilters]);

  return (
    <div tabIndex={-1} ref={ref} className="filter" {...events}>
      <Switch
        theme="default-fill"
        checked={finds}
        onClick={() => switchFinds()}
      >
        Achados
      </Switch>
      <Switch theme="pink-fill" checked={losts} onClick={() => switchLosts()}>
        Perdidos
      </Switch>
      <Switch
        theme="green-fill"
        checked={donateds}
        onClick={() => switchDonateds()}
      >
        Doações
      </Switch>
    </div>
  );
}
