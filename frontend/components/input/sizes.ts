export type ImageSize = {
  width: number;
  height: number;
  aspect: number;
};

export const bannerSize: ImageSize = {
  width: 400,
  height: 175,
  aspect: 16 / 7,
};

export const avatarSize: ImageSize = {
  width: 200,
  height: 200,
  aspect: 1,
};
