"use client";

import {
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
import { useCallback } from "react";
import { Item } from "@/context/items";
import { callCloseItemToast } from "../../ui/toasts";
import styles from "../index.module.scss";

interface CloseItemDialogProps {
  item: Item;
  token: string;
}

export default function CloseItemDialog({ item, token }: CloseItemDialogProps) {
  const { loading, setLoading } = useLoading();
  const navigation = useNavigation();

  const close = useCallback(() => {
    setLoading(true);
    fetch(`${process.env.API_URL}/items/${item.id}/close`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    })
      .then(async (response) => {
        if (!response.ok) throw await response.json();
        else {
          setLoading(false);
          callCloseItemToast();
          navigation.remove("/items/" + item.id);
          navigation.remove(
            "/users/" + item.user.id + "/items/" + item.id + "/edit"
          );
          navigation.replace("/users/" + item.user.id);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  }, [navigation, token, item, setLoading]);

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogContent className={styles.dialog}>
        <DialogHeader className={styles.header}>
          <DialogTitle>Confirmação</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja fechar esse item? Essa ação não poderá ser
            desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className={styles.footer}>
          <DialogClose asChild disabled={loading}>
            <Button onClick={close} disabled={loading} type="button">
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
  );
}
