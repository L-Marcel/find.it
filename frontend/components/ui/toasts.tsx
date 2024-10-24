import Button from "@/components/button";
import {
  Cheers,
  FloppyDisk,
  Folder,
  FolderDashed,
  FolderUser,
  PersonSimpleRun,
  UserCheck,
  UserPlus,
} from "@phosphor-icons/react/dist/ssr";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";

const duration = 6000;

export function callUpdateUserToast(id = "update-user" + uuid()) {
  toast.success("Dados atualizados!", {
    id,
    cancel: (
      <Button theme="green-fill" onClick={() => toast.dismiss(id)}>
        OK
      </Button>
    ),
    icon: <FolderUser />,
    description: "Que dados? (づ ◕‿◕ )づ",
    duration,
  });
}

export function callRegisterToast(id = "register" + uuid()) {
  toast.success("Cadastro realizado!", {
    id,
    cancel: (
      <Button theme="green-fill" onClick={() => toast.dismiss(id)}>
        OK
      </Button>
    ),
    icon: <UserPlus />,
    description: "É um prazer ver você aqui . . .",
    duration,
  });
}

export function callLoginToast(id = "login" + uuid()) {
  toast("Login realizado!", {
    id,
    cancel: (
      <Button theme="default-fill" onClick={() => toast.dismiss(id)}>
        OK
      </Button>
    ),
    icon: <UserCheck />,
    description: "Então, você voltou . . .",
    duration,
  });
}

export function callLogoutToast(id = "logout" + uuid()) {
  toast("Logout realizado!", {
    id,
    cancel: (
      <Button theme="default-fill" onClick={() => toast.dismiss(id)}>
        OK
      </Button>
    ),
    icon: <PersonSimpleRun />,
    description: "Até mais. (；⌣̀_⌣́)",
    duration,
  });
}

export function callCreateItemToast(id = "create-item" + uuid()) {
  toast.success("Item criado!", {
    id,
    cancel: (
      <Button theme="green-fill" onClick={() => toast.dismiss(id)}>
        OK
      </Button>
    ),
    icon: <Folder />,
    description: "Agora é só esperar alguém . . .",
    duration,
  });
}

export function callUpdateItemToast(id = "update-item" + uuid()) {
  toast.success("Item atualizado!", {
    id,
    cancel: (
      <Button theme="green-fill" onClick={() => toast.dismiss(id)}>
        OK
      </Button>
    ),
    icon: <FloppyDisk />,
    description: "Agora vai . . .",
    duration,
  });
}

export function callRemoveItemToast(id = "remove-item" + uuid()) {
  toast.warning("Item removido!", {
    id,
    cancel: (
      <Button theme="pink-fill" onClick={() => toast.dismiss(id)}>
        OK
      </Button>
    ),
    icon: <FolderDashed />,
    description: "Não foi dessa vez . . .",
    duration,
  });
}

export function callCloseItemToast(id = "close-item" + uuid()) {
  toast.success("Item fechado!", {
    id,
    cancel: (
      <Button theme="green-fill" onClick={() => toast.dismiss(id)}>
        OK
      </Button>
    ),
    icon: <Cheers />,
    description: "Você conseguiu! (ง •_•)ง",
    duration,
  });
}
