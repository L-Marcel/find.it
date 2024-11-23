import styles from "./index.module.scss";
import BackButton from "@/components/button/back";
import SearchProvider from "@/context/search";
import RankList from "@/components/rank/list";

import { Metadata } from "next";
import { getUsersRank } from "@/context/user";

export const metadata: Metadata = {
  title: "Find.it - Ranqueamento",
  description: "Veja nossos usuários mais pontuados!",
};

export const dynamic = "force-dynamic";

export default async function Rank() {
  const ranks = await getUsersRank();

  return (
    <>
      <header>
        <section>
          <BackButton />
        </section>
      </header>
      <main className={styles.rank}>
        <h3>Ranqueamento</h3>
        <section>
          <SearchProvider>
            <RankList ranks={ranks} />
          </SearchProvider>
        </section>
      </main>
    </>
  );
}
