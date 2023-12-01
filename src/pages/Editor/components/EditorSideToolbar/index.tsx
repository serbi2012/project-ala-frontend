import * as S from "./index.styles";
import NearMeIcon from "@mui/icons-material/NearMe";
import BrushIcon from "@mui/icons-material/Brush";
import BackHandIcon from "@mui/icons-material/BackHand";
import CategoryIcon from "@mui/icons-material/Category";
import { useRecoilState } from "recoil";
import { selectedToolState } from "../../../../recoil/atoms/selectedToolState";
import useCanvasMoveTool from "../../../../hooks/tools/useCanvasMoveTool";
import useDrawingTool from "../../../../hooks/tools/useDrawingTool";
import useShapeTool from "../../../../hooks/tools/useShapeTool";
import useSelectTool from "../../../../hooks/tools/useSelectTool";
import { ICanvasRef } from "../../../../types/canvasRef";

const EditorSideToolbar = ({ canvasRef }: ICanvasRef) => {
    const [selectedTool] = useRecoilState(selectedToolState);

    const { handleOnSelectTool } = useSelectTool({ canvasRef });
    const { handleOnCanvasMoveTool } = useCanvasMoveTool({ canvasRef });
    const { handleOnDrawingTool } = useDrawingTool({ canvasRef });
    const { handleOnShapeTool } = useShapeTool({ canvasRef });

    const SIDE_TOOL_ITEMS = [
        { name: "select", onClick: handleOnSelectTool, icon: <NearMeIcon /> },
        { name: "canvasMove", onClick: handleOnCanvasMoveTool, icon: <BackHandIcon /> },
        { name: "drawing", onClick: handleOnDrawingTool, icon: <BrushIcon /> },
        { name: "shape", onClick: handleOnShapeTool, icon: <CategoryIcon /> },
    ];

    return (
        <S.MainWrapper>
            {SIDE_TOOL_ITEMS.map((item, index) => (
                <S.IconWrapper key={index} onClick={item?.onClick} isActive={selectedTool === item?.name}>
                    {item?.icon}
                </S.IconWrapper>
            ))}
        </S.MainWrapper>
    );
};

export default EditorSideToolbar;
