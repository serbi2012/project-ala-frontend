import { ReactNode } from "react";
import NearMeIcon from "@mui/icons-material/NearMe";
import BrushIcon from "@mui/icons-material/Brush";
import BackHandIcon from "@mui/icons-material/BackHand";

const createIconMap = () => {
    // NOTE - key는 recoil의 selectedTool과 같아야함.
    const iconMap: Record<string, ReactNode> = {
        select: <NearMeIcon />,
        drawing: <BrushIcon />,
        canvasMove: <BackHandIcon />,
    };

    return iconMap;
};

export const useToolIcons = () => {
    return createIconMap();
};
