import CitySelector from "@/components/header/city/city";
import HeaderProfile from "@/components/header/profile";
import Search from "@/components/header/search";
import Loading from "@/components/loading";
import Query from "@/components/query";
import Filter from "@/components/switch/filter";
import SearchProvider from "@/context/search";
import Link from "next/link";
import { Suspense } from "react";
import styles from "./index.module.scss";
import Button from "@/components/button";
import { Trophy } from "@phosphor-icons/react/dist/ssr";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find.it",
  description: "Encontre o que procura!",
};

export default function Home() {
  return (
    <SearchProvider>
      <Loading />
      <header className={styles.header}>
        <section id="desktop">
          <div>
            <CitySelector />
            <Search />
          </div>
          <div>
            <Button to="/rank" icon={Trophy} />
            <Suspense fallback={<div id="login-or-profile" />}>
              <HeaderProfile />
            </Suspense>
          </div>
        </section>
        <section id="mobile">
          <div>
            <Button to="/rank" icon={Trophy} />
            <div id="header-profile">
              <Suspense fallback={<div id="login-or-profile" />}>
                <HeaderProfile />
              </Suspense>
            </div>
          </div>
          <div>
            <CitySelector />
            <Search />
          </div>
        </section>
        <section>
          <div className={styles.filters}>
            <Filter />
            <p>
              Quer nos ajudar a manter a plataforma?{" "}
              <Link
                target="_blank"
                href="https://www.gerarpix.com.br/pix?code=nWBzxcQA5OdJYTPXQcIiYq4wYN_HaypQkbJ7jba2Q_jfB0Q2684FV0rIZsei1UhuVSEwW1iU9bif0DGIP4YgPTEDUMfon6DM_iHmxvlqI5jcc7LSpnREiXE7sED6xVdcC4PXBERJqHr6p-NfhG4kfQ7m8_wzEYP8GvkZzSCuj3723XG5Ek0L5ByOtxrZ4U0wHxH2_wn8VlSIhyZe09DOfXHL6r3M3ang"
              >
                DOE
              </Link>
            </p>
          </div>
        </section>
      </header>
      <main>
        <Query />
      </main>
    </SearchProvider>
  );
}
