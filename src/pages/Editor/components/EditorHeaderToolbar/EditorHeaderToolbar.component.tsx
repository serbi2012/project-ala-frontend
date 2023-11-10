import { useRecoilState } from "recoil";
import * as S from "./EditorHeaderToolbar.styles";
import { selectedToolOptionState, selectedToolState } from "../../../../recoil/atoms/selectedToolState";
import { useToolIcons } from "../../../../hooks/useToolIcons";
import { T } from "../../../../styles/TextGuide.styles";
import { useEffect } from "react";
import { IEditorHeaderToolbarProps } from "./EditorHeaderToolbar.types";
import HeaderOptionInputBox from "../../../../components/@shared/HeaderOptionInputBox/HeaderOptionInputBox.component";

const EditorHeaderToolbar = ({ canvasRef }: IEditorHeaderToolbarProps) => {
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
            <S.OptionBox>
                <T.Body2>두께:</T.Body2>
                <HeaderOptionInputBox option="width" type="number" />
                <T.Body2>색상:</T.Body2>
                <HeaderOptionInputBox option="color" type="color" />
            </S.OptionBox>
        </S.MainWrapper>
    );
};

export default EditorHeaderToolbar;
