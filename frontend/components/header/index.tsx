import { Icon } from "@phosphor-icons/react";
import "./index.scss";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Button from "../button";
import Search from "./search";
import CitySelector from "./citySelector";
import Filter from "../switch/filter";
import Link from "next/link";
import BackButton from "../button/backButton";

import { Suspense } from "react";
import HeaderProfile from "./headerProfile";

interface HeaderProps {
  back?: boolean;
  backTo?: string;
  backIcon?: Icon;
  search?: boolean;
  profile?: boolean;
  rank?: boolean;
  edit?: boolean;
  create?: boolean;
  close?: boolean;
}

export default function Header({
  back = false,
  backTo = "",
  backIcon = ArrowLeft,
  close = false,
  create = false,
  edit = false,
  profile = false,
  rank = false,
  search = false,
}: HeaderProps) {
  return (
    <header className="header">
      <section>
        {search && (
          <div className="search">
            <CitySelector />
            <Search />
          </div>
        )}
        {back && !backTo && <BackButton />}
        {back && backTo && (
          <Button to={backTo} icon={backIcon}>
            Voltar
          </Button>
        )}
        {profile && (
          <Suspense fallback={<div id="login-or-profile" />}>
            <HeaderProfile />
          </Suspense>
        )}
      </section>
      <section>
        {search && (
          <div className="filters">
            <Filter />
            <p>
              Quer nos ajudar a manter a plataforma? <Link href="#">DOE</Link>
            </p>
          </div>
        )}
      </section>
    </header>
  );
}
