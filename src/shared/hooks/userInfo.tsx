import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const userInfo = atom({
  key: "userInfo",
  default: {
    token: "",
    login: "",
    url: "",
    repo: "",
    avatar_url: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export { userInfo };
