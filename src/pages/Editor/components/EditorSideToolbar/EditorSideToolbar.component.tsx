import * as S from "./EditorSideToolbar.styles";
import { IEditorSideToolbarProps } from "./EditorSideToolbar.types";
import NearMeIcon from "@mui/icons-material/NearMe";
import BrushIcon from "@mui/icons-material/Brush";
import BackHandIcon from "@mui/icons-material/BackHand";
import { useRecoilState } from "recoil";
import { selectedToolState } from "../../../../recoil/atoms/selectedToolState";
import useDrawingTool from "../../../../hooks/useDrawingTool";
import useSelectTool from "../../../../hooks/useSelectTool";
import useCanvasMoveTool from "../../../../hooks/useCanvasMoveTool";

const EditorSideToolbar = ({ canvasRef }: IEditorSideToolbarProps) => {
    const [selectedTool] = useRecoilState(selectedToolState);

    const { handleOnSelectTool } = useSelectTool({ canvasRef });
    const { handleOnCanvasMoveTool } = useCanvasMoveTool({ canvasRef });
    const { handleOnDrawingTool } = useDrawingTool({ canvasRef });

    return (
        <S.MainWrapper>
            <S.IconWrapper onClick={handleOnSelectTool} isActive={selectedTool === "select"}>
                <NearMeIcon />
            </S.IconWrapper>
            <S.IconWrapper onClick={handleOnDrawingTool} isActive={selectedTool === "drawing"}>
                <BrushIcon />
            </S.IconWrapper>
            <S.IconWrapper onClick={handleOnCanvasMoveTool} isActive={selectedTool === "canvasMove"}>
                <BackHandIcon />
            </S.IconWrapper>
        </S.MainWrapper>
    );
};

export default EditorSideToolbar;
