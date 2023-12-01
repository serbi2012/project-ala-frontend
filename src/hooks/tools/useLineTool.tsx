import { useEffect } from "react";
import { fabric } from "fabric";
import { useRecoilState } from "recoil";
import { selectedToolState, selectedToolOptionState } from "../../recoil/atoms/selectedToolState";
import { ICanvasRef } from "../../types/canvasRef";

const useLineTool = ({ canvasRef }: ICanvasRef) => {
    const [, setSelectedTool] = useRecoilState(selectedToolState);
    const [selectedToolOption] = useRecoilState<any>(selectedToolOptionState);

    let line: fabric.Line | null = null;
    let isDown: boolean = false;

    const handleOnLineTool = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.isDrawingMode = false;
        setSelectedTool("line");

        canvas.selection = false; // Disable group selection

        canvas.on("mouse:down", (options: any) => {
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
            });
            canvas.add(line);

            canvas.selection = false;
        });

        canvas.on("mouse:move", (options: any) => {
            if (!isDown || !line) return;
            const pointer = canvas.getPointer(options.e);

            let x2 = pointer.x;
            let y2 = pointer.y;

            // If shift key is pressed, we constrain the line to be straight
            if (options.e.shiftKey) {
                const xDiff = x2 - Number(line.x1);
                const yDiff = y2 - Number(line.y1);

                if (Math.abs(xDiff) > Math.abs(yDiff)) {
                    y2 = line.y1; // Horizontal line
                } else {
                    x2 = line.x1; // Vertical line
                }
            }

            line.set({ x2: x2, y2: y2 });
            canvas.renderAll();

            canvas.selection = true;
        });

        canvas.on("mouse:up", () => {
            isDown = false;
        });
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        return () => {
            // Clean up
            canvas.off("mouse:down");
            canvas.off("mouse:move");
            canvas.off("mouse:up");
        };
    }, [canvasRef]); // Make sure to only run once

    return { handleOnLineTool };
};

export default useLineTool;
