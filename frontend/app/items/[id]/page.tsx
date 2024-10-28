import BackButton from "@/components/button/back";
import HeaderProfile from "@/components/header/profile";
import { getItem, typeToText } from "@/context/items";
import Image from "next/image";
import "./index.scss";
import Avatar from "@/components/avatar";
import Label from "@/components/label";
import {
  At,
  MapPinArea,
  Pencil,
  Stamp,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { Phone } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CloseItemDialog from "@/components/dialogues/item/close";
import { headers } from "next/headers";
import { getUser, PublicUser, User } from "@/context/user";

export default async function ItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const item = await getItem(id);

  const _headers = await headers();
  const userId = _headers.get("x-auth-id");
  const token = _headers.get("x-auth-token");

  let user: User | PublicUser = item.user;
  const isAuth = userId && token;
  const isAuthWithOwner = isAuth && user.id == userId;
  if (isAuthWithOwner) user = await getUser(userId, token);

  let place = `${item.city} - ${item.state}`;
  if (item.district) place = `${item.district}, ${place}`;
  if (item.number > 0) {
    place = `${item.number} - ${place}`;
    if (item.street) place = `${item.street}, ${place}`;
  } else if (item.street) place = `${item.street} - ${place}`;

  return (
    <Dialog>
      {isAuthWithOwner && <CloseItemDialog item={item} token={token} />}
      <header className="item-page-header">
        <section id="desktop">
          <div>
            <BackButton />
            {isAuthWithOwner && (
              <>
                <Button
                  icon={Pencil}
                  to={`/users/${item.user?.id}/items/${item.id}/edit`}
                >
                  Editar
                </Button>
                <DialogTrigger asChild>
                  <Button icon={Stamp}>Fechar</Button>
                </DialogTrigger>
              </>
            )}
          </div>
          {!isAuth && (
            <div>
              <HeaderProfile />
            </div>
          )}
        </section>
        <section id="mobile">
          <div>
            <BackButton onlyIcon />
            {isAuthWithOwner && (
              <>
                <Button
                  icon={Pencil}
                  to={`/users/${item.user?.id}/items/${item.id}/edit`}
                />
                <DialogTrigger asChild>
                  <Button icon={Stamp} />
                </DialogTrigger>
              </>
            )}
          </div>
          {!isAuth && (
            <div>
              <HeaderProfile />
            </div>
          )}
        </section>
      </header>
      <main className={`item-page ${item.type.toLowerCase()}`}>
        <section className="info">
          <Image
            className="item-photo"
            src={`${process.env.API_DOMAIN}/items/${item.picture}`}
            alt="Item Photo"
            width={736}
            height={322}
          />
          <article className={item.type.toLowerCase()}>
            <span className="type">{typeToText(item.type)}</span>
            <h1>{item.title}</h1>
            <hr />
            <h2>{item.description}</h2>
          </article>
        </section>
        <hr className="hidden lg:flex" />
        <section className="user">
          <div>
            <Avatar
              picture={`${process.env.API_DOMAIN}/users/${item.user?.picture}`}
              big
            />
            <Label header={`${typeToText(item.type).toUpperCase()} POR...`}>
              {item.user?.name}
            </Label>
          </div>
          <hr />
          <div>
            <Label header={`${typeToText(item.type).toUpperCase()} POR...`}>
              {item.user?.name}
            </Label>
            <Label id="stats" header="ENCONTRADOS / PERDIDOS / DOADOS">
              {`${item.user?.finds} / ${item.user?.recovered} / ${item.user?.donated}`}
            </Label>
            {(item.user?.contact === "PHONE" ||
              item.user?.contact === "BOTH") && (
              <Label
                icon={
                  item.user?.whatsapp ? (
                    <WhatsappLogo width={24} height={24} />
                  ) : (
                    <Phone width={24} height={24} />
                  )
                }
                header="TELEFONE"
              >
                {item.user?.phone}
              </Label>
            )}
            {(item.user?.contact === "EMAIL" ||
              item.user?.contact === "BOTH") && (
              <Label icon={<At width={24} height={24} />} header="EMAIL">
                {item.user?.email}
              </Label>
            )}
          </div>
        </section>
        <hr />
        <section className="location">
          <Label header="CIDADE / ESTADO">{`${item.city} / ${item.state}`}</Label>
          <Label header="BAIRRO">{item.district ?? "---"}</Label>
          <Label header="COMPLEMENTO">{item.complement ?? "---"}</Label>
          <Label header="RUA">{item.street ?? "---"}</Label>
          <Label header="NÚMERO">
            {item.number > 0 ? item.number.toString() : "---"}
          </Label>
          <Button
            to={`https://www.google.com.br/maps/place/${place}`}
            target="_blank"
            theme="default-fill"
            icon={MapPinArea}
          >
            Google Maps
          </Button>
        </section>
      </main>
    </Dialog>
  );
}
