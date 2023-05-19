import { locationType } from "@/types/location";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const locationState = atom<locationType>({
  key: "locationState",
  default: {
    latitude: 0,
    longitude: 0,
  },
  effects_UNSTABLE: [persistAtom],
});