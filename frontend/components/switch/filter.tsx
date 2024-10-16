import useFilters from "@/context/filters";
import Switch from ".";
import { useCallback } from "react";
import "./index.scss";

export default function Filter() {
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
    <div className="filter">
      <Switch
        theme="default-fill"
        checked={finds}
        onChange={() => switchFinds()}
      >
        Achados
      </Switch>
      <Switch theme="pink-fill" checked={losts} onChange={() => switchLosts()}>
        Perdidos
      </Switch>
      <Switch
        theme="green-fill"
        checked={donateds}
        onChange={() => switchDonateds()}
      >
        Doações
      </Switch>
    </div>
  );
}
