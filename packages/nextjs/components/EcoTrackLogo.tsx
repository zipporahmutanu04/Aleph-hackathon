import Image from "next/image";

type EcoTrackLogoProps = {
  width?: number;
  height?: number;
};

export const EcoTrackLogo: React.FC<EcoTrackLogoProps> = ({ width = 40, height = 40 }) => {
  return (
    <Image
      src="/ecotrack-logo.png"
      alt="EcoTrack Logo"
      width={width}
      height={height}
      className="object-contain"
    />
  );
};