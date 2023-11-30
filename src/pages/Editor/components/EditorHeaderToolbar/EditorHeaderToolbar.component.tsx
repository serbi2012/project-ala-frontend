import { useRecoilState } from "recoil";
import * as S from "./EditorHeaderToolbar.styles";
import { selectedToolOptionState, selectedToolState } from "../../../../recoil/atoms/selectedToolState";
import { useToolIcons } from "../../../../hooks/useToolIcons";
import { T } from "../../../../styles/TextGuide.styles";
import { useEffect, useRef } from "react";
import { IEditorHeaderToolbarProps } from "./EditorHeaderToolbar.types";
import HeaderOptionInputBox from "../../../../components/@shared/HeaderOptionInputBox/HeaderOptionInputBox.component";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import SquareOutlinedIcon from "@mui/icons-material/SquareOutlined";
import ChangeHistoryOutlinedIcon from "@mui/icons-material/ChangeHistoryOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import useCustomHotkeys from "../../../../hooks/useCustomHotkeys";

const EditorHeaderToolbar = ({ canvasRef }: IEditorHeaderToolbarProps) => {
    const copiedObjectRef = useRef<any>(null);

    const [selectedTool] = useRecoilState(selectedToolState);
    const [selectedToolOption, setSelectedToolOption] = useRecoilState<any>(selectedToolOptionState);

    const iconMap = useToolIcons();

    const handleOnShapeTarget = (shape: string) => {
        setSelectedToolOption((prev: any) => {
            return { ...prev, shapeTarget: shape };
        });
    };

    const handleDeleteShape = () => {
        const canvas = canvasRef.current;

        const activeObjects = canvas?.getActiveObjects();

        if (activeObjects && activeObjects.length > 0) {
            activeObjects.forEach((object: fabric.Object) => {
                canvas.remove(object);
            });

            canvas.discardActiveObject();
        } else {
            const activeObject = canvas?.getActiveObject();
            if (activeObject) {
                canvas.remove(activeObject);
                canvas.discardActiveObject();
            }
        }

        canvas?.renderAll();
    };

    const handleRotateShape = () => {
        const canvas = canvasRef.current;
        const activeObject = canvas?.getActiveObject();

        if (activeObject) {
            activeObject.rotate((activeObject.angle || 0) + 90);
            activeObject.setCoords();
            canvas.renderAll();
        }
    };

    const handleCopyShape = () => {
        const canvas = canvasRef.current;
        const activeObject = canvas?.getActiveObject();

        copiedObjectRef.current = activeObject;
    };

    const handlePasteShape = () => {
        const canvas = canvasRef.current;
        const activeObject = copiedObjectRef.current;

        if (activeObject && activeObject.clone) {
            activeObject.clone((cloned: any) => {
                canvas.add(
                    cloned.set({
                        left: cloned.left + 10,
                        top: cloned.top + 10,
                        evented: true,
                    }),
                );
                canvas.setActiveObject(cloned);
                canvas.renderAll();
            });
        }
    };

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
                            <HeaderOptionInputBox option="width" type="number" suffix="px" />
                        </S.OptionBox>
                        <S.OptionBox>
                            <T.Body2>색상:</T.Body2>
                            <HeaderOptionInputBox option="color" type="color" suffix="px" />
                        </S.OptionBox>
                    </>
                ) : selectedTool === "shape" ? (
                    <>
                        <S.IconWrapper
                            isActive={selectedToolOption?.shapeTarget === "ellipse"}
                            onClick={() => {
                                handleOnShapeTarget("ellipse");
                            }}
                        >
                            <CircleOutlinedIcon />
                        </S.IconWrapper>
                        <S.IconWrapper
                            isActive={selectedToolOption?.shapeTarget === "rect"}
                            onClick={() => {
                                handleOnShapeTarget("rect");
                            }}
                        >
                            <SquareOutlinedIcon />
                        </S.IconWrapper>
                        <S.IconWrapper
                            isActive={selectedToolOption?.shapeTarget === "triangle"}
                            onClick={() => {
                                handleOnShapeTarget("triangle");
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
                                width={140}
                            />
                            <HeaderOptionInputBox
                                option="shapeTotalWidth"
                                type="number"
                                prefix="W"
                                suffix="px"
                                width={140}
                            />
                        </S.OptionBox>
                        <S.OptionBox>
                            <T.Body2>위치:</T.Body2>
                            <HeaderOptionInputBox option="shapeTop" type="number" prefix="Y" width={140} />
                            <HeaderOptionInputBox option="shapeLeft" type="number" prefix="W" width={140} />
                        </S.OptionBox>
                        <S.OptionBox>
                            <T.Body2>색상:</T.Body2>
                            <HeaderOptionInputBox option="shapeFill" type="color" />
                        </S.OptionBox>
                        <S.OptionBox>
                            <T.Body2>테두리 두께:</T.Body2>
                            <HeaderOptionInputBox option="shapeBorderWidth" type="number" />
                        </S.OptionBox>
                        <S.OptionBox>
                            <T.Body2>테두리 색상:</T.Body2>
                            <HeaderOptionInputBox option="shapeBorderColor" type="color" />
                        </S.OptionBox>
                        <S.IconWrapper onClick={handleDeleteShape}>
                            <DeleteForeverIcon />
                        </S.IconWrapper>
                        <S.IconWrapper onClick={handleRotateShape}>
                            <RotateRightIcon />
                        </S.IconWrapper>
                        <S.IconWrapper onClick={handleCopyShape}>
                            <ContentCopyIcon />
                        </S.IconWrapper>
                    </>
                ) : null}
            </S.OptionContainer>
        </S.MainWrapper>
    );
};

export default EditorHeaderToolbar;
