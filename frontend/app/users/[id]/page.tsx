import Button from "@/components/button";
import BackButton from "@/components/button/back";
import HeaderProfile from "@/components/header/profile";
import { getPublicUser, getUser, PublicUser } from "@/context/user";
import {
  At,
  Pencil,
  Phone,
  Plus,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { headers } from "next/headers";
import { Suspense } from "react";
import "./index.scss";
import Avatar from "@/components/avatar";
import Label from "@/components/label";
import ProfileSection from "@/components/profile/section";
import UserQuery from "@/components/query/user";
import SearchProvider from "@/context/search";
import Filter from "@/components/switch/filter";
import Link from "next/link";
import CitySelector from "@/components/header/city/city";
import Search from "@/components/header/search";

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
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
      <header className="header">
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
      <main className="user-page">
        <ProfileSection user={user} />
        <SearchProvider>
          <section className="flex flex-col gap-4 -mb-4 lg:mt-4">
            <div className="search">
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
            <div className="filters">
              <Filter />
              <p id="mobile">
                Quer nos ajudar a manter a plataforma? <Link href="#">DOE</Link>
              </p>
            </div>
          </section>
          <UserQuery userId={user.id} />
        </SearchProvider>
      </main>
    </>
  );
}
