import Image from "next/image";
import { Download } from "@phosphor-icons/react/dist/ssr";
import CropImageDialogue from "../dialogues/crop";
import { bannerSize } from "./sizes";

interface BannerProps {
  value?: string;
  onFileLoaded: (base64: string, blob: Blob) => void;
  onFileClear: () => void;
}

export default function InputBanner({
  value,
  onFileClear,
  onFileLoaded,
}: BannerProps) {
  if (value)
    return (
      <div className="banner">
        <Image
          src={value}
          alt=""
          width={bannerSize.width}
          height={bannerSize.height}
        />
        <CropImageDialogue
          imageSize={bannerSize}
          name="picture"
          canClear={!!value}
          onFileClear={onFileClear}
          onFileLoaded={onFileLoaded}
        />
      </div>
    );
  return (
    <label className="banner" tabIndex={0}>
      <CropImageDialogue
        imageSize={bannerSize}
        name="picture"
        inputOnly
        canClear={!!value}
        onFileClear={onFileClear}
        onFileLoaded={onFileLoaded}
      />
      <span className="banner-text">
        <Download />
        <p>Adicione uma foto</p>
      </span>
    </label>
  );
}
