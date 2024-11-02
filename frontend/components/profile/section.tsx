import { At, Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import Avatar from "../avatar";
import Label from "../label";
import { PublicUser } from "@/context/user";

interface ProfileSectionProps {
  user: PublicUser;
}

export default function ProfileSection({ user }: ProfileSectionProps) {
  return (
    <section className="user-profile-section">
      <div>
        <Avatar
          picture={`${process.env.API_DOMAIN}/users/${user.picture}`}
          big
        />
        <Label header="SEU NOME É...">{user.name}</Label>
      </div>
      <hr />
      <div>
        <Label header="SEU NOME É...">{user.name}</Label>
        <Label id="stats" header="ACHADO / PERDIDO / DOADO">
          {`${user.finds} / ${user.recovered} / ${user.donated}`}
        </Label>
        {user.phone && (
          <Label
            icon={
              user.whatsapp ? (
                <WhatsappLogo width={24} height={24} />
              ) : (
                <Phone width={24} height={24} />
              )
            }
            header="TELEFONE"
          >
            {user.phone}
          </Label>
        )}
        {user.email && (
          <Label icon={<At width={24} height={24} />} header="EMAIL">
            {user.email}
          </Label>
        )}
      </div>
    </section>
  );
}
