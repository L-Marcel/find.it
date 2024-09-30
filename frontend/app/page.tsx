import Input from "@/components/input";
import Textarea from "@/components/input/area";
import { At, Lock } from "@phosphor-icons/react/dist/ssr";

export default function Home() {
  return (
    <main>
      <Input />
      <Input icon={At} placeholder="E-mail" />
      <Input icon={Lock} placeholder="Senha" type="password" />
      <Input
        icon={Lock}
        placeholder="Confirmar senha"
        type="password"
        error="As senhas não coincidem!"
      />
      <Textarea placeholder="Digite algo aqui . . ." />
    </main>
  );
}
