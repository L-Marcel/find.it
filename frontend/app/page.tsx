import Input from "@/components/input";
import Switch from "@/components/switch";
import Textarea from "@/components/input/area";
import { At, Lock } from "@phosphor-icons/react/dist/ssr";

export default function Home() {
  return (
    <main>
      <Switch label="PERDIDO" theme="default-fill"/>
      <Switch label="PERDIDO" theme="pink-fill"/>
      <Switch label="PERDIDO" theme="green-fill"/>
    </main>
  );
}
