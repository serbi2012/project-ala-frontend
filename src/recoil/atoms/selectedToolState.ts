import { atom } from "recoil";

export const selectedToolState = atom({
    key: "selectedToolState",
    default: "select",
});

export const selectedToolOptionState = atom({
    key: "selectedToolOptionState",
    default: {},
});
