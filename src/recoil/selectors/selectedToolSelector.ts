import { selector } from "recoil";
import { selectedToolOptionState } from "../atoms/selectedToolState";

export const shapeTargetSelector = selector({
    key: "shapeTargetSelector",
    get: ({ get }) => {
        const selectedToolOption = get(selectedToolOptionState);
        return selectedToolOption.shapeTarget;
    },
    set: ({ set }, newValue) => {
        set(selectedToolOptionState, (prev) => ({ ...prev, shapeTarget: newValue }));
    },
});
