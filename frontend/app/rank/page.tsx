import "./index.scss";
import BackButton from "@/components/button/backButton";
import SearchProvider from "@/context/search";
import UserList from "@/components/userCard/userList";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find.it - Ranqueamento",
  description: "Veja nossos usuários mais pontuados!",
};

export default function Rank() {
  return (
    <>
      <header className="header">
        <section>
          <BackButton />
        </section>
      </header>
      <main className="main-container">
        <h3>Ranqueamento</h3>
        <section>
          <SearchProvider>
            <UserList />
          </SearchProvider>
        </section>
      </main>
    </>
  );
}
