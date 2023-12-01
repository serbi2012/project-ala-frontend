import { useEffect } from "react";
import { useRecoilState } from "recoil";
import * as S from "./index.styles";
import { selectedToolOptionState, selectedToolState } from "../../../../recoil/atoms/selectedToolState";
import { useToolIcons } from "../../../../hooks/common/useToolIcons";
import HeaderToolItems from "./components/HeaderToolItems";
import { ICanvasRef } from "../../../../types/canvasRef";

const EditorHeaderToolbar = ({ canvasRef }: ICanvasRef) => {
    const [selectedTool] = useRecoilState(selectedToolState);
    const [selectedToolOption] = useRecoilState<any>(selectedToolOptionState);

    const iconMap = useToolIcons();

    useEffect(() => {
        const canvas = canvasRef?.current;

        if (canvas) {
            canvas.freeDrawingBrush.width = Number(selectedToolOption?.width);
        }
    }, [selectedToolOption?.width]);

    useEffect(() => {
        const canvas = canvasRef?.current;

        if (canvas) {
            canvas.freeDrawingBrush.color = String(selectedToolOption?.color);
        }
    }, [selectedToolOption?.color]);

    return (
        <S.MainWrapper>
            <S.IconWrapper>{iconMap[selectedTool] || <div />}</S.IconWrapper>
            <S.VerticalLine />
            <HeaderToolItems canvasRef={canvasRef} />
        </S.MainWrapper>
    );
};

export default EditorHeaderToolbar;
