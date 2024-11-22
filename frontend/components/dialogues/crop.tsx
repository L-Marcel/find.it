"use client";

import Button from "@/components/button";
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
import getCroppedImg from "@/lib/crop";
import { useCallback, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { ImageSize } from "../input/sizes";
import File, { InputProps } from "../input/file";
import { Slider } from "../ui/slider";
import styles from "./index.module.scss";

export interface CropProps extends InputProps {
  imageSize: ImageSize;
}

export default function CropImageDialogue({
  imageSize,
  onFileClear,
  onFileLoaded,
  ...props
}: CropProps) {
  const [src, setSrc] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [area, setArea] = useState<Area>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const confirm = useCallback(async () => {
    try {
      const result = await getCroppedImg(src, area);
      if (result) onFileLoaded(result.base64, result.blob);
    } catch (e) {
      console.error(e);
    }
  }, [src, area, onFileLoaded]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(e) => {
        setIsOpen(e);
      }}
    >
      <File
        onFileClear={() => {
          setCrop({ x: 0, y: 0 });
          setZoom(1);
          setArea({ x: 0, y: 0, width: 0, height: 0 });
          setIsOpen(false);
          setSrc("");
          onFileClear();
        }}
        onFileLoaded={(_, blob) => {
          const url = URL.createObjectURL(blob);
          setSrc(url);
          setIsOpen(true);
        }}
        {...props}
      />
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className={`${styles.dialog} ${styles.image}`}>
          <DialogHeader className={styles.header}>
            <DialogTitle>Ajustando imagem</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Recorte a imagem no tamanho desejado.
          </DialogDescription>
          <section
            style={{
              height: imageSize.height,
            }}
          >
            <Cropper
              classes={{ containerClassName: styles.cropper }}
              image={src}
              crop={crop}
              zoom={zoom}
              maxZoom={10}
              minZoom={1}
              zoomSpeed={0.25}
              aspect={imageSize.aspect}
              onCropChange={setCrop}
              onCropComplete={(_, area) => setArea(area)}
              onZoomChange={setZoom}
              keyboardStep={2}
            />
          </section>
          <section>
            <Slider
              className={styles.slider}
              min={1}
              max={10}
              value={[zoom]}
              onValueChange={(value) => setZoom(value[0])}
              step={0.1}
            />
          </section>
          <DialogFooter className={styles.footer}>
            <DialogClose autoFocus asChild>
              <Button theme="default-fill" onClick={confirm} type="button">
                Confirmar
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button">Cancelar</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
