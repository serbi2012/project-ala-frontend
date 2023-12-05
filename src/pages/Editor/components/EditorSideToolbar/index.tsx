import * as S from "./index.styles";
import { useRecoilState } from "recoil";
import { selectedToolState } from "../../../../recoil/atoms/selectedToolState";
import useCanvasMoveTool from "../../../../hooks/tools/useCanvasMoveTool";
import useDrawingTool from "../../../../hooks/tools/useDrawingTool";
import useShapeTool from "../../../../hooks/tools/useShapeTool";
import useSelectTool from "../../../../hooks/tools/useSelectTool";
import { ICanvasRef } from "../../../../types/canvasRef";
import useLineTool from "../../../../hooks/tools/useLineTool";
import { useToolIcons } from "../../../../hooks/common/useToolIcons";

const EditorSideToolbar = ({ canvasRef }: ICanvasRef) => {
    const [selectedTool] = useRecoilState(selectedToolState);

    const toolIcons = useToolIcons();
    const toolHandlers = {
        select: useSelectTool({ canvasRef }).handleOnSelectTool,
        canvasMove: useCanvasMoveTool({ canvasRef }).handleOnCanvasMoveTool,
        drawing: useDrawingTool({ canvasRef }).handleOnDrawingTool,
        line: useLineTool({ canvasRef }).handleOnLineTool,
        shape: useShapeTool({ canvasRef }).handleOnShapeTool,
    };

    const SIDE_TOOL_ITEMS = Object.entries(toolHandlers).map(([name, onClick]) => ({
        name,
        onClick,
        icon: toolIcons[name],
    }));

    return (
        <S.MainWrapper>
            {SIDE_TOOL_ITEMS.map((item, index) => (
                <S.IconWrapper key={index} onClick={item.onClick} isActive={selectedTool === item.name}>
                    {item.icon}
                </S.IconWrapper>
            ))}
        </S.MainWrapper>
    );
};

export default EditorSideToolbar;
