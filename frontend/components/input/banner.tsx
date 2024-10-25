import Image from "next/image";
import File from "./file";
import { Download } from "@phosphor-icons/react/dist/ssr";

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
        <Image src={value} alt="Banner" width={512} height={256} />
        <File
          name="picture"
          canClear={!!value}
          onFileClear={onFileClear}
          onFileLoaded={onFileLoaded}
        />
      </div>
    );
  return (
    <label className="banner" tabIndex={0}>
      <File
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
