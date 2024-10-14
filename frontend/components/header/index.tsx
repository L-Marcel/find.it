"use client";

import { Icon } from "@phosphor-icons/react";
import "./index.scss";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Button from "../button";
import Search from "./search";
import CitySelector from "./citySelector";

interface HeaderProps {
  back?: string;
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
  back = "",
  backIcon = ArrowLeft,
  close = false,
  create = false,
  edit = false,
  login = false,
  rank = false,
  search = false,
}: HeaderProps) {
  return (
    <header className="header">
      {search && (
        <div className="search">
          <CitySelector />
          <Search />
        </div>
      )}
      {back && (
        <Button to={back} icon={backIcon}>
          Voltar
        </Button>
      )}
      {login && (
        <div className="login">
          <Button to="/register">Cadastrar-se</Button>
          <Button to="/login" theme="default-fill">
            Entrar
          </Button>
        </div>
      )}
    </header>
  );
}
