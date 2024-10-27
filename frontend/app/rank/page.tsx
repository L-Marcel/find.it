"use client";

import BackButton from "@/components/button/backButton";
import SearchProvider from "@/context/search";
import UserList from "@/components/userCard/userList";

export default function Rank() {
  return (
    <>
      <header className="header">
        <section>
          <BackButton />
        </section>
      </header>
      <main>
        <p>Ranqueamento</p>
        <section>
          <SearchProvider>
            <UserList />
          </SearchProvider>
        </section>
      </main>
    </>
  );
}
