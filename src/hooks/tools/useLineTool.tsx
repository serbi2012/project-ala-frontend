import { useEffect, useRef } from "react";
import { fabric } from "fabric";
import { useRecoilState } from "recoil";
import { selectedToolState, selectedToolOptionState } from "../../recoil/atoms/selectedToolState";
import { ICanvasRef } from "../../types/canvasRef";

const useLineTool = ({ canvasRef }: ICanvasRef) => {
    const [selectedTool, setSelectedTool] = useRecoilState(selectedToolState);
    const [selectedToolOption] = useRecoilState<any>(selectedToolOptionState);

    const currentLineRef = useRef<fabric.Object | null>(null);

    let line: fabric.Line | null = null;
    let isDown: boolean = false;

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) return;

        const startDrawing = (options: any) => {
            if (selectedTool !== "line") return;

            if (options?.target) {
                if (currentLineRef.current !== options.target) {
                    currentLineRef.current = options.target;
                }
            } else {
                isDown = true;

                const pointer = canvas.getPointer(options.e);
                const points = [pointer.x, pointer.y, pointer.x, pointer.y];

                line = new fabric.Line(points, {
                    strokeWidth: selectedToolOption.lineWidth || 2,
                    fill: selectedToolOption.lineColor || "black",
                    stroke: selectedToolOption.lineColor || "black",
                    originX: "center",
                    originY: "center",
                    selectable: true,
                    evented: true,
                    lockScalingY: true,
                    lockScalingFlip: true,
                });

                line.setControlsVisibility({
                    tl: false,
                    tr: false,
                    mt: false,
                    mb: false,
                    ml: true,
                    mr: true,
                    bl: false,
                    br: false,
                    mtr: true,
                });

                canvas.add(line);

                canvas.selection = false;
            }
        };

        const continueDrawing = (options: any) => {
            if (!isDown || !line) return;
            if (selectedTool !== "line") return;

            const pointer = canvas.getPointer(options.e);

            let x2 = pointer.x;
            let y2 = pointer.y;

            if (options.e.shiftKey) {
                const angleRad = Math.atan2(y2 - Number(line?.y1), x2 - Number(line?.x1));
                const angleDeg = (angleRad * 180) / Math.PI;

                const snappedAngleDeg = Math.round(angleDeg / 45) * 45;

                const radians = (snappedAngleDeg * Math.PI) / 180;

                const distance = Math.sqrt((x2 - Number(line?.x1)) ** 2 + (y2 - Number(line?.y1)) ** 2);
                x2 = Number(line?.x1) + distance * Math.cos(radians);
                y2 = Number(line?.y1) + distance * Math.sin(radians);
            }

            line.set({ x2: x2, y2: y2 });
            canvas.renderAll();

            canvas.selection = true;
        };

        const finishDrawing = () => {
            if (selectedTool !== "line") return;

            isDown = false;
            canvas.selection = true;
        };

        canvas.on("mouse:down", startDrawing);
        canvas.on("mouse:move", continueDrawing);
        canvas.on("mouse:up", finishDrawing);

        return () => {
            canvas.off("mouse:down");
            canvas.off("mouse:move");
            canvas.off("mouse:up");
        };
    }, [canvasRef, selectedTool]);

    const handleOnLineTool = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.isDrawingMode = false;

        setSelectedTool("line");
    };

    return { handleOnLineTool };
};

export default useLineTool;
