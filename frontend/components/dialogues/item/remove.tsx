"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import Button from "../../button";
import useNavigation from "@/context/navigation";
import useLoading from "@/context/loading";
import { ReactNode, useCallback } from "react";
import { Item } from "@/context/items";
import { callRemoveItemToast } from "../../ui/toasts";
import styles from "../index.module.scss";

interface RemoveItemDialogProps {
  item: Item;
  token: string;
  children: ReactNode;
}

export default function RemoveItemDialog({
  item,
  token,
  children,
}: RemoveItemDialogProps) {
  const { loading, setLoading } = useLoading();
  const navigation = useNavigation();

  const remove = useCallback(() => {
    setLoading(true);
    fetch(`${process.env.API_URL}/items/${item.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    })
      .then(async (response) => {
        if (!response.ok) throw await response.json();
        setLoading(false);
        callRemoveItemToast();
        navigation.replace("/users/" + item.user.id);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [navigation, token, item, setLoading]);

  return (
    <Dialog>
      {children}
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className={styles.dialog}>
          <DialogHeader className={styles.header}>
            <DialogTitle>Confirmação</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja apagar esse item? Essa ação não poderá ser
              desfeita.
            </DialogDescription>
            <DialogDescription>
              Caso esteja removendo-o por tê-lo <b>encontrado</b>,{" "}
              <b>devolvido</b> ou <b>doado</b>, recomendamos que o feche ao
              invés de apagá-lo. Itens removidos <b>não contam pontos</b>.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className={styles.footer}>
            <DialogClose asChild disabled={loading}>
              <Button onClick={remove} disabled={loading} type="button">
                Confirmar
              </Button>
            </DialogClose>
            <DialogClose autoFocus asChild disabled={loading}>
              <Button theme="default-fill" disabled={loading} type="button">
                Cancelar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
