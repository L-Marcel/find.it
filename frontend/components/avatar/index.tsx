import Image from "next/image";
import { UserCircle } from "@phosphor-icons/react/dist/ssr";
import "./index.scss"

interface AvatarProps {
  theme?: "default" | "big";
  picture: string;
  name?: string;
}

export default function Avatar({
  theme = "default",
  picture,
  name = "Avatar",
} : AvatarProps){
  return(
    <section className={`avatar ${theme}`}>
      {picture ? (
        <Image 
          className="user-photo" 
          src={picture} 
          alt={name} 
          width={98} 
          height={98}
        />
      ) : (
        <UserCircle 
          weight="thin" 
          width={98} 
          height={98}
        />
      )}
    </section>
  );
}