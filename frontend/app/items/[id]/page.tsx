import BackButton from "@/components/button/backButton";
import HeaderProfile from "@/components/header/headerProfile";
import { getItem, typeToText } from "@/context/items";
import Image from "next/image";
import "./index.scss";
import Avatar from "@/components/avatar";
import Label from "@/components/label";
import { At, MapPinArea, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { Phone } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/button";

export default async function ItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const item = await getItem(id);

  return (
    <>
      <header className="header">
        <section id="desktop">
          <div>
            <BackButton />
          </div>
          <div className="login">
            <HeaderProfile />
          </div>
        </section>
        <section id="mobile">
          <div>
            <BackButton />
          </div>
          <div className="login">
            <HeaderProfile />
          </div>
        </section>
      </header>
      <main className={`item-profile ${item.type.toLowerCase()}`}>
        <section className="item-infos">
          <div>
            <Image 
              className="item-photo"
              src={`${process.env.API_DOMAIN}/items/${item.picture}`}
              alt="Item Photo"
              width={736}
              height={322}/>
          </div>
          <section className={`header ${item.type.toLowerCase()}`}>
            <span className="type">{typeToText(item.type)}</span>
            <h1>{item.title}</h1>
            <div className="divider"></div>
            <h2>{item.description}</h2>
          </section>
        </section>
        <div className="divider"></div>
        <section className="user-profile">
          <Avatar picture={`${process.env.API_DOMAIN}/users/${item.user.picture}`} theme="big"/>
          <div className="user-infos">
            <div>
              <Label 
                header={`${typeToText(item.type).toUpperCase()} POR...`} >
                {item.user.name}
              </Label>
            </div>  
            <div>
              <Label 
                header="ENCONTRADOS / PERDIDOS / DOADOS">
                {`${item.user.finds} / ${item.user.recovered} / ${item.user.donated}`}
              </Label>
            </div>
            {item.user.whatsapp ? (
            <div>
              <Label 
                icon={<WhatsappLogo width={24} height={24}/>} 
                header="TELEFONE">
                {item.user.phone}
              </Label>
            </div>
            ) : item.user.contact === "PHONE" || item.user.contact === "BOTH" ? (
            <div>
              <Label 
                icon={<Phone width={24} height={24}/>}
                header="TELEFONE">
                {item.user.phone}
                </Label>
            </div>
            ) : null}
            {item.user.contact === "EMAIL" || item.user.contact === "BOTH" ? (
            <div>
              <Label 
                icon={<At width={24} height={24}/>}
                header="EMAIL">
                {item.user.email}
              </Label>
            </div>
            ) : null}
          </div>
        </section>
        <div className="divider"></div>
        <div className="local-infos">
          <Label header="CIDADE / ESTADO">{`${item.city} / ${item.state}`}</Label>
          {item.district ? (
            <Label header="BAIRRO">{`${item.district}`}</Label>
          ) : null}
          {item.complement ? (
            <Label header="COMPLEMENTO">{`${item.complement}`}</Label>
          ) : null}
          {item.street ? (
            <Label header="RUA">{`${item.street}`}</Label>
          ) : null}
          {item.complement ? (
            <Label header="NÚMERO">{`${item.number}`}</Label>
          ) : null}
          {item.number ? (
            <Button 
              to={`https://www.google.com.br/maps/place/${item.street}, ${item.number} - ${item.district}, ${item.city} - ${item.state}`}
              target="_blank" 
              theme="default-fill"
              icon={MapPinArea}>
                Google Maps
            </Button>
          ) : item.street ? (
            <Button 
              to={`https://www.google.com.br/maps/place/${item.street}, ${item.city} - ${item.state}`} 
              target="_blank"
              theme="default-fill"
              icon={MapPinArea}>
                Google Maps
            </Button>
          ) : item.district ? (
            <Button 
              to={`https://www.google.com.br/maps/place/${item.district}, ${item.city} - ${item.state}`} 
              target="_blank"
              theme="default-fill"
              icon={MapPinArea}>
                Google Maps
            </Button>
          ) : 
            <Button 
              to={`https://www.google.com.br/maps/place/${item.city}, ${item.state}`} 
              target="_blank"
              theme="default-fill"
              icon={MapPinArea}>
                Google Maps
            </Button>
          }
        </div>
      </main>
    </>
  );
}
