import { At, Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import Avatar from "../avatar";
import Label from "../label";
import { PublicUser } from "@/context/user";
import { formatPhone } from "@/lib/utils";
import styles from "./index.module.scss";

interface ProfileSectionProps {
  user: PublicUser;
}

export default function ProfileSection({ user }: ProfileSectionProps) {
  return (
    <section className={styles.userProfileSection}>
      <div>
        <Avatar
          picture={`${process.env.API_DOMAIN}/users/${user.picture}?v=${user.updatedAt.replace(/ /g, "_")}`}
          big
        />
        <Label canCopy header="SEU NOME É...">
          {user.name}
        </Label>
      </div>
      <hr />
      <div>
        <Label canCopy header="SEU NOME É...">
          {user.name}
        </Label>
        <Label id="stats" header="ACHADO / PERDIDO / DOADO">
          {`${user.finds} / ${user.recovered} / ${user.donated}`}
        </Label>
        {user.phone && (
          <Label
            canCopy
            icon={
              user.whatsapp ? (
                <WhatsappLogo width={24} height={24} />
              ) : (
                <Phone width={24} height={24} />
              )
            }
            header="TELEFONE"
          >
            {formatPhone(user.phone)}
          </Label>
        )}
        {user.email && (
          <Label canCopy icon={<At width={24} height={24} />} header="EMAIL">
            {user.email}
          </Label>
        )}
      </div>
    </section>
  );
}
