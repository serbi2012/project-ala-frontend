import { useRecoilState } from "recoil";
import * as S from "./EditorHeaderToolbar.styles";
import { selectedToolOptionState, selectedToolState } from "../../../../recoil/atoms/selectedToolState";
import { useToolIcons } from "../../../../hooks/useToolIcons";
import { T } from "../../../../styles/TextGuide.styles";
import { MutableRefObject, useEffect } from "react";
import HeaderOptionInputBox from "../../../../components/@shared/HeaderOptionInputBox/HeaderOptionInputBox.component";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import SquareOutlinedIcon from "@mui/icons-material/SquareOutlined";
import ChangeHistoryOutlinedIcon from "@mui/icons-material/ChangeHistoryOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import useCustomHotkeys from "../../../../hooks/useCustomHotkeys";
import useCommonFeature from "../../../../hooks/feature/useCommonFeature";
import { shapeTargetSelector } from "../../../../recoil/selectors/selectedToolSeletor";

export interface IEditorHeaderToolbarProps {
    canvasRef?: MutableRefObject<fabric.Canvas> | any;
}

const EditorHeaderToolbar = ({ canvasRef }: IEditorHeaderToolbarProps) => {
    const [selectedTool] = useRecoilState(selectedToolState);
    const [selectedToolOption] = useRecoilState<any>(selectedToolOptionState);

    const [, setShapeTarget] = useRecoilState(shapeTargetSelector);

    const iconMap = useToolIcons();
    const { handleCopyShape, handleDeleteShape, handlePasteShape, handleRotateShape, handleCopyAndPasteShape } =
        useCommonFeature({
            canvasRef,
        });

    useCustomHotkeys("Delete", handleDeleteShape);
    useCustomHotkeys("Meta Backspace", handleDeleteShape);
    useCustomHotkeys("Control r", handleRotateShape);
    useCustomHotkeys("Control c", handleCopyShape);
    useCustomHotkeys("Control v", handlePasteShape);
    useCustomHotkeys("Meta c", handleCopyShape);
    useCustomHotkeys("Meta v", handlePasteShape);

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
            <S.OptionContainer>
                {selectedTool === "drawing" ? (
                    <>
                        <S.OptionBox>
                            <T.Body2>두께:</T.Body2>
                            <HeaderOptionInputBox option="width" type="number" suffix="px" isArrow />
                        </S.OptionBox>
                        <S.OptionBox>
                            <T.Body2>색상:</T.Body2>
                            <HeaderOptionInputBox option="color" type="color" width={40} />
                        </S.OptionBox>
                    </>
                ) : selectedTool === "shape" ? (
                    <>
                        <S.IconWrapper
                            isActive={selectedToolOption?.shapeTarget === "ellipse"}
                            onClick={() => {
                                setShapeTarget("ellipse");
                            }}
                        >
                            <CircleOutlinedIcon />
                        </S.IconWrapper>
                        <S.IconWrapper
                            isActive={selectedToolOption?.shapeTarget === "rect"}
                            onClick={() => {
                                setShapeTarget("rect");
                            }}
                        >
                            <SquareOutlinedIcon />
                        </S.IconWrapper>
                        <S.IconWrapper
                            isActive={selectedToolOption?.shapeTarget === "triangle"}
                            onClick={() => {
                                setShapeTarget("triangle");
                            }}
                        >
                            <ChangeHistoryOutlinedIcon />
                        </S.IconWrapper>
                        <S.OptionBox>
                            <T.Body2>크기:</T.Body2>
                            <HeaderOptionInputBox
                                option="shapeTotalHeight"
                                type="number"
                                prefix="H"
                                suffix="px"
                                width={150}
                            />
                            <HeaderOptionInputBox
                                option="shapeTotalWidth"
                                type="number"
                                prefix="W"
                                suffix="px"
                                width={150}
                            />
                        </S.OptionBox>
                        <S.OptionBox>
                            <T.Body2>위치:</T.Body2>
                            <HeaderOptionInputBox option="shapeTop" type="number" prefix="Y" width={130} />
                            <HeaderOptionInputBox option="shapeLeft" type="number" prefix="W" width={130} />
                        </S.OptionBox>
                        <S.OptionBox>
                            <T.Body2>색상:</T.Body2>
                            <HeaderOptionInputBox option="shapeFill" type="color" width={40} />
                        </S.OptionBox>
                        <S.OptionBox>
                            <T.Body2>테두리 두께:</T.Body2>
                            <HeaderOptionInputBox option="shapeBorderWidth" type="number" suffix="px" isArrow />
                        </S.OptionBox>
                        <S.OptionBox>
                            <T.Body2>테두리 색상:</T.Body2>
                            <HeaderOptionInputBox option="shapeBorderColor" type="color" width={40} />
                        </S.OptionBox>
                        <S.IconWrapper onClick={handleDeleteShape}>
                            <DeleteForeverIcon />
                        </S.IconWrapper>
                        <S.IconWrapper onClick={handleRotateShape}>
                            <RotateRightIcon />
                        </S.IconWrapper>
                        <S.IconWrapper onClick={handleCopyAndPasteShape}>
                            <ContentCopyIcon />
                        </S.IconWrapper>
                    </>
                ) : null}
            </S.OptionContainer>
        </S.MainWrapper>
    );
};

export default EditorHeaderToolbar;
