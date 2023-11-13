import { useRecoilState } from "recoil";
import * as S from "./EditorHeaderToolbar.styles";
import { selectedToolOptionState, selectedToolState } from "../../../../recoil/atoms/selectedToolState";
import { useToolIcons } from "../../../../hooks/useToolIcons";
import { T } from "../../../../styles/TextGuide.styles";
import { useEffect } from "react";
import { IEditorHeaderToolbarProps } from "./EditorHeaderToolbar.types";
import HeaderOptionInputBox from "../../../../components/@shared/HeaderOptionInputBox/HeaderOptionInputBox.component";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import SquareOutlinedIcon from "@mui/icons-material/SquareOutlined";
import ChangeHistoryOutlinedIcon from "@mui/icons-material/ChangeHistoryOutlined";

const EditorHeaderToolbar = ({ canvasRef }: IEditorHeaderToolbarProps) => {
    const [selectedTool] = useRecoilState(selectedToolState);
    const [selectedToolOption, setSelectedToolOption] = useRecoilState<any>(selectedToolOptionState);

    const iconMap = useToolIcons();

    const handleOnShapeTarget = (shape: string) => {
        setSelectedToolOption((prev: any) => {
            return { ...prev, shapeTarget: shape };
        });
    };

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
                {selectedTool === "drawing" ? (
                    <>
                        <T.Body2>두께:</T.Body2>
                        <HeaderOptionInputBox option="width" type="number" />
                        <T.Body2>색상:</T.Body2>
                        <HeaderOptionInputBox option="color" type="color" />
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
                    </>
                ) : null}
            </S.OptionBox>
        </S.MainWrapper>
    );
};

export default EditorHeaderToolbar;
