"use client";

import { Icon } from "@phosphor-icons/react";
import "./index.scss";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Button from "../button";
import Search from "./search";
import CitySelector from "./citySelector";
import useUser, { useUserId } from "@/context/user";
import Profile from "../profile";
import Filter from "../switch/filter";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface HeaderProps {
  back?: boolean;
  backTo?: string;
  backIcon?: Icon;
  search?: boolean;
  login?: boolean;
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
  login = false,
  rank = false,
  search = false,
}: HeaderProps) {
  const router = useRouter();
  const user = useUser();
  const id = useUserId();

  return (
    <header className="header">
      <section>
        {search && (
          <div className="search">
            <CitySelector />
            <Search />
          </div>
        )}
        {back && !backTo && (
          <Button onClick={router.back} icon={backIcon}>
            Voltar
          </Button>
        )}
        {back && backTo && (
          <Button to={backTo} icon={backIcon}>
            Voltar
          </Button>
        )}
        {login &&
          (user && id ? (
            <Profile id={id} name={user.name} picture={user.profile} />
          ) : (
            <div className="login">
              <Button to="/register">Cadastrar-se</Button>
              <Button to="/login" theme="default-fill">
                Entrar
              </Button>
            </div>
          ))}
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
