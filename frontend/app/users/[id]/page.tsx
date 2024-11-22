import Button from "@/components/button";
import BackButton from "@/components/button/back";
import HeaderProfile from "@/components/header/profile";
import { getPublicUser, getUser, PublicUser } from "@/context/user";
import { Pencil, Plus } from "@phosphor-icons/react/dist/ssr";
import { headers } from "next/headers";
import { Suspense } from "react";
import styles from "./index.module.scss";
import ProfileSection from "@/components/profile/section";
import UserQuery from "@/components/query/user";
import SearchProvider from "@/context/search";
import Filter from "@/components/switch/filter";
import Link from "next/link";
import Search from "@/components/header/search";
import { Metadata } from "next";

interface UserPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: UserPageProps): Promise<Metadata> {
  const id = (await params).id;
  const user = await getPublicUser(id);

  return {
    title: user.name,
  };
}

export default async function UserPage({ params }: UserPageProps) {
  const id = (await params).id;
  const _headers = await headers();
  const userId = _headers.get("x-auth-id");
  const token = _headers.get("x-auth-token");

  const user: PublicUser = await getPublicUser(id);
  const isAuthWithOwner = !!(userId && token && id == userId);
  if (isAuthWithOwner) {
    const authUser = await getUser(userId, token);
    user.email = authUser.email;
    user.phone = authUser.phone;
  }

  return (
    <>
      <header className={styles.header}>
        <section id="desktop">
          <div>
            <BackButton />
            {isAuthWithOwner && (
              <Button icon={Pencil} to={`/users/${user.id}/edit`}>
                Editar
              </Button>
            )}
          </div>
          <div>
            <Suspense fallback={<div id="login-or-profile" />}>
              <HeaderProfile />
            </Suspense>
          </div>
        </section>
        <section id="mobile">
          <div>
            <BackButton onlyIcon />
            <Suspense fallback={<div id="login-or-profile" />}>
              <HeaderProfile edit={isAuthWithOwner} />
            </Suspense>
          </div>
        </section>
      </header>
      <main id="user-page" className={styles.userPage}>
        <ProfileSection user={user} />
        <SearchProvider>
          <section className="flex flex-col gap-4 -mb-4 lg:mt-4">
            <div className={styles.search}>
              <Search />
              {isAuthWithOwner && (
                <>
                  <Button
                    id="desktop"
                    icon={Plus}
                    to={`/users/${user.id}/items/create`}
                  >
                    Adicionar
                  </Button>
                  <Button
                    id="mobile"
                    icon={Plus}
                    to={`/users/${user.id}/items/create`}
                  />
                </>
              )}
            </div>
            <div className={styles.filters}>
              <Filter />
              <p id="mobile">
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
          <UserQuery userId={user.id} />
        </SearchProvider>
      </main>
    </>
  );
}
