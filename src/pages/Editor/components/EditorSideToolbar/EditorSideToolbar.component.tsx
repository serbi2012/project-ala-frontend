import * as S from "./EditorSideToolbar.styles";
import { IEditorSideToolbarProps } from "./EditorSideToolbar.types";
import NearMeIcon from "@mui/icons-material/NearMe";
import BrushIcon from "@mui/icons-material/Brush";
import BackHandIcon from "@mui/icons-material/BackHand";
import { useEffect, useState } from "react";

const EditorSideToolbar = ({ canvasRef }: IEditorSideToolbarProps) => {
    const [isCanvasMoveMode, setIsCanvasMoveMode] = useState(false);
    const [isDragging, setDragging] = useState(false);
    const [lastMouseX, setLastMouseX] = useState(0);
    const [lastMouseY, setLastMouseY] = useState(0);

    const handleOnDrawingMode = () => {
        const canvas = canvasRef?.current;

        if (canvas) {
            canvas.isDrawingMode = true;
            canvas.freeDrawingBrush.color = "black";
            canvas.freeDrawingBrush.width = 2;

            setIsCanvasMoveMode(false);
        }
    };

    const handleOnSelectMode = () => {
        const canvas = canvasRef?.current;

        if (canvas) {
            canvas.isDrawingMode = false;
            setIsCanvasMoveMode(false);
        }
    };

    const handleOnCanvasMoveMode = () => {
        const canvas = canvasRef?.current;

        if (canvas) {
            setIsCanvasMoveMode(true);
        }
    };

    useEffect(() => {
        if (canvasRef?.current && isCanvasMoveMode) {
            const canvasElement = document.getElementById("drawing-canvas") as any;
            const parentElement = canvasElement.parentElement;

            // 마우스 이벤트 리스너를 추가
            canvasElement.addEventListener("mousedown", (e: any) => {
                setDragging(true);
                setLastMouseX(e.clientX);
                setLastMouseY(e.clientY);
            });

            canvasElement.addEventListener("mouseup", () => {
                setDragging(false);
            });

            canvasElement.addEventListener("mousemove", (e: any) => {
                if (isDragging) {
                    const deltaX = e.clientX - lastMouseX;
                    const deltaY = e.clientY - lastMouseY;
                    setLastMouseX(Number(e.clientX));
                    setLastMouseY(Number(e.clientY));

                    parentElement.style.left = `${parentElement.offsetLeft + deltaX}px`;
                    parentElement.style.top = `${parentElement.offsetTop + deltaY}px`;
                }
            });
        }
    }, [isDragging]);

    return (
        <S.MainWrapper>
            <S.IconWrapper onClick={handleOnSelectMode}>
                <NearMeIcon />
            </S.IconWrapper>
            <S.IconWrapper onClick={handleOnDrawingMode}>
                <BrushIcon />
            </S.IconWrapper>
            <S.IconWrapper onClick={handleOnCanvasMoveMode}>
                <BackHandIcon />
            </S.IconWrapper>
        </S.MainWrapper>
    );
};

export default EditorSideToolbar;
