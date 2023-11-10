import { useRecoilState } from "recoil";
import * as S from "./EditorHeaderToolbar.styles";
import { selectedToolState } from "../../../../recoil/atoms/selectedToolState";
import { useToolIcons } from "../../../../hooks/useToolIcons";
import { T } from "../../../../styles/TextGuide.styles";
import { useEffect, useState } from "react";
import { IEditorHeaderToolbarProps } from "./EditorHeaderToolbar.types";

const EditorHeaderToolbar = ({ canvasRef }: IEditorHeaderToolbarProps) => {
    const [selectedTool] = useRecoilState(selectedToolState);

    const [inputValue, setInputValue] = useState("10px");

    const iconMap = useToolIcons();

    useEffect(() => {
        const canvas = canvasRef?.current;

        if (canvas) {
            const drawingWidth = Number(inputValue?.replace("px", ""));

            canvas.freeDrawingBrush.width = drawingWidth;
        }
    }, [inputValue]);

    return (
        <S.MainWrapper>
            <S.IconWrapper>{iconMap[selectedTool] || <div />}</S.IconWrapper>
            <S.VerticalLine />
            <S.OptionBox>
                <T.Body2>두께:</T.Body2>
                <S.OptionInputBox>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onFocus={(e) => setInputValue(e.target.value)}
                    />
                </S.OptionInputBox>
            </S.OptionBox>
        </S.MainWrapper>
    );
};

export default EditorHeaderToolbar;
