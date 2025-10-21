import cube from "./cube.svg";
import goods from "./goods.svg";
import audio from "./audio.svg";
import illustration from "./illustration.svg";
import more from "./more.svg";
import music from "./music.svg";

export const marketCategoryIcons = {
  cube,
  goods,
  audio,
  illustration,
  more,
  music,
} as const;

export type MarketCategoryIconName = keyof typeof marketCategoryIcons;
