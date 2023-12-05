import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { selectedToolState } from "../../recoil/atoms/selectedToolState";
import { ICanvasRef } from "../../types/canvasRef";

const useCanvasMoveTool = ({ canvasRef }: ICanvasRef) => {
    const [selectedTool, setSelectedTool] = useRecoilState(selectedToolState);

    const handleOnCanvasMoveTool = () => {
        const canvas = canvasRef?.current;

        if (canvas) {
            canvas.isDrawingMode = false;

            setSelectedTool("canvasMove");
        }
    };

    useEffect(() => {
        const fabricjsCanvasWrapperElement = document.getElementById("fabricjs-canvas-wrapper") as any;
        const canvasElement = document.getElementById("drawing-canvas") as any;
        const parentElement = canvasElement.parentElement;

        if (selectedTool === "canvasMove") {
            fabricjsCanvasWrapperElement.style.cursor = "grab";
            parentElement.style.pointerEvents = "none";
        } else {
            fabricjsCanvasWrapperElement.style.removeProperty("cursor");
            parentElement.style.pointerEvents = "all";
        }

        let isDragging: boolean;
        let mouseX: number;
        let mouseY: number;

        const CanvasMoveMouseDown = (event: any) => {
            if (selectedTool === "canvasMove") {
                fabricjsCanvasWrapperElement.style.cursor = "grabbing";

                isDragging = true;

                mouseX = event.clientX;
                mouseY = event.clientY;
            }
        };

        const CanvasMoveMouseMove = (event: any) => {
            if (selectedTool === "canvasMove" && isDragging) {
                const deltaX = event.clientX - mouseX;
                const deltaY = event.clientY - mouseY;

                parentElement.style.left = `${parentElement.offsetLeft + deltaX}px`;
                parentElement.style.top = `${parentElement.offsetTop + deltaY}px`;

                mouseX = event.clientX;
                mouseY = event.clientY;
            }
        };

        const CanvasMoveMouseUp = () => {
            if (selectedTool === "canvasMove") {
                fabricjsCanvasWrapperElement.style.cursor = "grab";

                isDragging = false;
            }
        };

        fabricjsCanvasWrapperElement.addEventListener("mousedown", CanvasMoveMouseDown);
        fabricjsCanvasWrapperElement.addEventListener("mousemove", CanvasMoveMouseMove);
        fabricjsCanvasWrapperElement.addEventListener("mouseup", CanvasMoveMouseUp);

        return () => {
            fabricjsCanvasWrapperElement.removeEventListener("mousedown", CanvasMoveMouseDown);
            fabricjsCanvasWrapperElement.removeEventListener("mousemove", CanvasMoveMouseMove);
            fabricjsCanvasWrapperElement.removeEventListener("mouseup", CanvasMoveMouseUp);
        };
    }, [selectedTool]);

    return { handleOnCanvasMoveTool };
};

export default useCanvasMoveTool;
