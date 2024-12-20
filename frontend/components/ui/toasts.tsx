import Button from "@/components/button";
import {
  Cheers,
  FileImage,
  FloppyDisk,
  Folder,
  FolderDashed,
  FolderUser,
  PersonSimpleRun,
  SealWarning,
  SecurityCamera,
  UserCheck,
  UserPlus,
} from "@phosphor-icons/react/dist/ssr";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";
import styles from "./index.module.scss";

const duration = 6500;

function notification() {
  new Audio("/notification.mp3").play();
}

function success() {
  notification();
}

function error() {
  new Audio("/error.mp3").play();
}

export function callUpdateUserToast(id = "update-user-" + uuid()) {
  success();
  toast.success("Dados atualizados!", {
    id,
    cancel: (
      <Button
        className={styles.button}
        theme="green-fill"
        onClick={() => toast.dismiss(id)}
      >
        OK
      </Button>
    ),
    icon: <FolderUser />,
    description: "Que dados? (づ ◕‿◕ )づ",
    duration,
  });
}

export function callRegisterToast(id = "register-" + uuid()) {
  success();
  toast.success("Cadastro realizado!", {
    id,
    cancel: (
      <Button
        className={styles.button}
        theme="green-fill"
        onClick={() => toast.dismiss(id)}
      >
        OK
      </Button>
    ),
    icon: <UserPlus />,
    description: "É um prazer ver você aqui . . .",
    duration,
  });
}

export function callLoginToast(id = "login-" + uuid()) {
  notification();
  toast("Login realizado!", {
    id,
    cancel: (
      <Button
        className={styles.button}
        theme="default-fill"
        onClick={() => toast.dismiss(id)}
      >
        OK
      </Button>
    ),
    icon: <UserCheck />,
    description: "Então, você voltou . . .",
    duration,
  });
}

export function callLogoutToast(id = "logout-" + uuid()) {
  notification();
  toast("Logout realizado!", {
    id,
    cancel: (
      <Button
        className={styles.button}
        theme="default-fill"
        onClick={() => toast.dismiss(id)}
      >
        OK
      </Button>
    ),
    icon: <PersonSimpleRun />,
    description: "Até mais. (；⌣̀_⌣́)",
    duration,
  });
}

export function callCreateItemToast(id = "create-item-" + uuid()) {
  success();
  toast.success("Item criado!", {
    id,
    cancel: (
      <Button
        className={styles.button}
        theme="green-fill"
        onClick={() => toast.dismiss(id)}
      >
        OK
      </Button>
    ),
    icon: <Folder />,
    description: "Agora é só esperar alguém . . .",
    duration,
  });
}

export function callUpdateItemToast(id = "update-item-" + uuid()) {
  success();
  toast.success("Item atualizado!", {
    id,
    cancel: (
      <Button
        className={styles.button}
        theme="green-fill"
        onClick={() => toast.dismiss(id)}
      >
        OK
      </Button>
    ),
    icon: <FloppyDisk />,
    description: "Agora vai . . .",
    duration,
  });
}

export function callRemoveItemToast(id = "remove-item-" + uuid()) {
  notification();
  toast.warning("Item removido!", {
    id,
    cancel: (
      <Button
        className={styles.button}
        theme="pink-fill"
        onClick={() => toast.dismiss(id)}
      >
        OK
      </Button>
    ),
    icon: <FolderDashed />,
    description: "Não foi dessa vez . . .",
    duration,
  });
}

export function callCloseItemToast(id = "close-item-" + uuid()) {
  success();
  toast.success("Item fechado!", {
    id,
    cancel: (
      <Button
        className={styles.button}
        theme="green-fill"
        onClick={() => toast.dismiss(id)}
      >
        OK
      </Button>
    ),
    icon: <Cheers />,
    description: "Você conseguiu! (ง •_•)ง",
    duration,
  });
}

export function callUnauthorizedToast(id = "unauthorized-" + uuid()) {
  error();
  toast.warning("Credenciais, por favor?", {
    id,
    cancel: (
      <Button
        className={styles.button}
        theme="pink-fill"
        onClick={() => toast.dismiss(id)}
      >
        OK
      </Button>
    ),
    icon: <SecurityCamera />,
    description: "Que é você? (¬_¬)",
    duration,
  });
}

export function callInvalidImageToast(id = "invalid-image-" + uuid()) {
  error();
  toast.warning("Formato inválido", {
    id,
    cancel: (
      <Button
        className={styles.button}
        theme="pink-fill"
        onClick={() => toast.dismiss(id)}
      >
        OK
      </Button>
    ),
    icon: <FileImage />,
    description: "Apenas imagens, por favor . . .",
    duration,
  });
}

export function callInvalidFormToast(id = "invalid-form-" + uuid()) {
  error();
  toast.warning("Algo não está certo!", {
    id,
    cancel: (
      <Button
        className={styles.button}
        theme="pink-fill"
        onClick={() => toast.dismiss(id)}
      >
        OK
      </Button>
    ),
    icon: <SealWarning />,
    description: "Verifique os campos . . .",
    duration,
  });
}

export function callTextCopiedToast(id = "text-copied-" + uuid()) {
  notification();
  toast("Texto copiado!", {
    id,
    cancel: (
      <Button
        className={styles.button}
        theme="default-fill"
        onClick={() => toast.dismiss(id)}
      >
        OK
      </Button>
    ),
    icon: <UserCheck />,
    description: "Agora cole onde quiser . . .",
    duration,
  });
}
