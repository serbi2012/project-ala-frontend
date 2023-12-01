import { useRecoilState } from "recoil";
import * as S from "./index.styles";
import { selectedToolOptionState, selectedToolState } from "../../../../recoil/atoms/selectedToolState";
import { useToolIcons } from "../../../../hooks/common/useToolIcons";
import { MutableRefObject, useEffect } from "react";
import useCustomHotkeys from "../../../../hooks/common/useCustomHotkeys";
import useCommonFeature from "../../../../hooks/feature/useCommonFeature";
import HeaderToolItems from "./components/HeaderToolItems";

export interface IEditorHeaderToolbarProps {
    canvasRef?: MutableRefObject<fabric.Canvas> | any;
}

const EditorHeaderToolbar = ({ canvasRef }: IEditorHeaderToolbarProps) => {
    const [selectedTool] = useRecoilState(selectedToolState);
    const [selectedToolOption] = useRecoilState<any>(selectedToolOptionState);

    const iconMap = useToolIcons();
    const { handleCopyShape, handleDeleteShape, handlePasteShape, handleRotateShape } = useCommonFeature({
        canvasRef,
    });

    useCustomHotkeys("Delete", handleDeleteShape);
    useCustomHotkeys("Meta+Backspace", handleDeleteShape);
    useCustomHotkeys("Control+KeyR", handleRotateShape);
    useCustomHotkeys("Control+KeyC", handleCopyShape);
    useCustomHotkeys("Control+KeyV", handlePasteShape);
    useCustomHotkeys("Meta+KeyC", handleCopyShape);
    useCustomHotkeys("Meta+KeyV", handlePasteShape);

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
