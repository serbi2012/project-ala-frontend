import { MutableRefObject, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import { selectedToolOptionState, selectedToolState } from "../recoil/atoms/selectedToolState";
import { fabric } from "fabric";

interface IUseShapeTool {
    canvasRef: MutableRefObject<fabric.Canvas | null>;
}

const useShapeTool = ({ canvasRef }: IUseShapeTool) => {
    const [selectedTool, setSelectedTool] = useRecoilState(selectedToolState);
    const [selectedToolOption, setSelectedToolOption] = useRecoilState<any>(selectedToolOptionState);

    const currentShapeRef = useRef<fabric.Object | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        if (selectedTool === "select") {
            canvas.forEachObject((object) => {
                object.set({
                    selectable: true,
                    evented: true,
                });
            });

            canvas.renderAll();
        }
    }, [selectedTool]);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) return;

        const startDrawing = (options: any) => {
            if (selectedTool !== "shape") return;
            const shapeType = selectedToolOption?.shapeTarget;

            canvas.selection = false;

            if (shapeType) {
                const pointer = canvas.getPointer(options.e);
                let shape: fabric.Object | null = null;

                const shapeOptions = {
                    left: pointer.x,
                    top: pointer.y,
                    strokeWidth: selectedToolOption.strokeWidth || 1,
                    stroke: selectedToolOption.stroke || "transparent",
                    fill: selectedToolOption.fill || "black",
                    selectable: false,
                    evented: false,
                };

                if (shapeType === "rect") {
                    shape = new fabric.Rect({ ...shapeOptions, width: 1, height: 1 });
                } else if (shapeType === "ellipse") {
                    shape = new fabric.Ellipse({ ...shapeOptions, rx: 1, ry: 1 });
                } else if (shapeType === "triangle") {
                    shape = new fabric.Triangle({ ...shapeOptions, width: 1, height: 1 });
                }

                if (shape) {
                    canvas.add(shape);
                    currentShapeRef.current = shape;
                }
            }
        };

        const continueDrawing = (options: any) => {
            const shape = currentShapeRef.current;
            if (!shape) return;
            if (selectedTool !== "shape") return;

            const pointer = canvas.getPointer(options.e);
            const width = Math.abs(pointer.x - (shape.left ?? 0));
            const height = Math.abs(pointer.y - (shape.top ?? 0));

            if (shape instanceof fabric.Rect || shape instanceof fabric.Triangle) {
                shape.set({ width, height });
            } else if (shape instanceof fabric.Ellipse) {
                shape.set({ rx: width / 2, ry: height / 2 });
            }

            canvas.renderAll();
        };

        const finishDrawing = () => {
            if (selectedTool !== "shape") return;

            const shape = currentShapeRef.current;
            if (shape) {
                shape.set({ selectable: true, evented: true });
                currentShapeRef.current = null;
                canvas.setActiveObject(shape);
            }
        };

        canvas.on("mouse:down", startDrawing);
        canvas.on("mouse:move", continueDrawing);
        canvas.on("mouse:up", finishDrawing);

        return () => {
            canvas.off("mouse:down", startDrawing);
            canvas.off("mouse:move", continueDrawing);
            canvas.off("mouse:up", finishDrawing);
        };
    }, [canvasRef, selectedToolOption, selectedTool]);

    const handleOnShapeTool = () => {
        setSelectedTool("shape");

        if (!selectedToolOption?.shapeMode)
            setSelectedToolOption((prevOptions: any) => ({
                ...prevOptions,
                shapeTarget: "rect",
            }));

        if (canvasRef.current) {
            canvasRef.current.forEachObject((object) => {
                object.set({
                    selectable: false,
                    evented: false,
                });
            });
            canvasRef.current.discardActiveObject();
            canvasRef.current.renderAll();
        }
    };

    return { handleOnShapeTool };
};

export default useShapeTool;
