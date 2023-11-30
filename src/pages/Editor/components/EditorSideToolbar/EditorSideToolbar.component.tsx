import * as S from "./EditorSideToolbar.styles";
import { IEditorSideToolbarProps } from "./EditorSideToolbar.types";
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

const EditorSideToolbar = ({ canvasRef }: IEditorSideToolbarProps) => {
    const [selectedTool] = useRecoilState(selectedToolState);

    const { handleOnSelectTool } = useSelectTool({ canvasRef });
    const { handleOnCanvasMoveTool } = useCanvasMoveTool({ canvasRef });
    const { handleOnDrawingTool } = useDrawingTool({ canvasRef });
    const { handleOnShapeTool } = useShapeTool({ canvasRef });

    return (
        <S.MainWrapper>
            <S.IconWrapper onClick={handleOnSelectTool} isActive={selectedTool === "select"}>
                <NearMeIcon />
            </S.IconWrapper>
            <S.IconWrapper onClick={handleOnCanvasMoveTool} isActive={selectedTool === "canvasMove"}>
                <BackHandIcon />
            </S.IconWrapper>
            <S.IconWrapper onClick={handleOnDrawingTool} isActive={selectedTool === "drawing"}>
                <BrushIcon />
            </S.IconWrapper>
            <S.IconWrapper onClick={handleOnShapeTool} isActive={selectedTool === "shape"}>
                <CategoryIcon />
            </S.IconWrapper>
        </S.MainWrapper>
    );
};

export default EditorSideToolbar;
