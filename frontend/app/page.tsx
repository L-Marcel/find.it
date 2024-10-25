import CitySelector from "@/components/header/citySelector";
import HeaderProfile from "@/components/header/headerProfile";
import Search from "@/components/header/search";
import Loading from "@/components/loading";
import Query from "@/components/query";
import Filter from "@/components/switch/filter";
import SearchProvider from "@/context/search";
import Link from "next/link";
import { Suspense } from "react";
import "./index.scss";
import Button from "@/components/button";
import { Trophy } from "@phosphor-icons/react/dist/ssr";

export default function Home() {
  return (
    <SearchProvider>
      <Loading />
      <header className="header">
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
          <div className="filters">
            <Filter />
            <p>
              Quer nos ajudar a manter a plataforma? <Link href="#">DOE</Link>
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
