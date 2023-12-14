import { atom } from "recoil";

export const pageSizeState = atom({
    key: "pageSizeState",
    default: { width: 1280, height: 720 },
});
