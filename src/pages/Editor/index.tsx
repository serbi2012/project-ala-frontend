import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";
import * as S from "./index.styles";
import EditorHeader from "./components/EditorHeader";
import EditorHeaderToolbar from "./components/EditorHeaderToolbar";
import EditorSideToolbar from "./components/EditorSideToolbar";
import { AlignGuidelines } from "fabric-guideline-plugin";
import { useHotkeysSetup } from "./hooks/useHotkeysSetup";
import { pageSizeState } from "../../recoil/atoms/pageOptionState copy";
import { useRecoilState } from "recoil";

const Editor = () => {
    const [pageSize] = useRecoilState(pageSizeState);

    const drawingCanvas = useRef<fabric.Canvas | null>(null);

    useHotkeysSetup({ canvasRef: drawingCanvas });

    useEffect(() => {
        if (!drawingCanvas.current) {
            drawingCanvas.current = new fabric.Canvas("drawing-canvas");

            const guideline = new AlignGuidelines({
                canvas: drawingCanvas.current,
            });

            guideline.init();

            const canvas = drawingCanvas.current;

            canvas.setBackgroundColor("white", canvas.renderAll.bind(canvas));

            const canvasElement = document.getElementById("drawing-canvas") as any;
            const parentElement = canvasElement.parentElement;

            parentElement.style.position = "absolute";
            parentElement.style.top = "160px";
            parentElement.style.left = "160px";
        }
    }, []);

    return (
        <S.MainWrapper>
            <EditorHeader canvasRef={drawingCanvas} />
            <EditorHeaderToolbar canvasRef={drawingCanvas} />
            <S.DrawingContainer>
                <EditorSideToolbar canvasRef={drawingCanvas} />
                <S.FabricjsCanvasWrapper id="fabricjs-canvas-wrapper">
                    <canvas id="drawing-canvas" width={pageSize.width} height={pageSize.height} />
                </S.FabricjsCanvasWrapper>
            </S.DrawingContainer>
        </S.MainWrapper>
    );
};

export default Editor;
