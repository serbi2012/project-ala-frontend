import { MutableRefObject, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import { selectedToolOptionState, selectedToolState } from "../recoil/atoms/selectedToolState";
import { fabric } from "fabric";
import { formatToFix } from "../utils/formatNumber";

interface IUseShapeTool {
    canvasRef: MutableRefObject<fabric.Canvas | null>;
}

const useShapeTool = ({ canvasRef }: IUseShapeTool) => {
    const [selectedTool, setSelectedTool] = useRecoilState(selectedToolState);
    const [selectedToolOption, setSelectedToolOption] = useRecoilState<any>(selectedToolOptionState);

    const currentShapeRef = useRef<fabric.Object | null>(null);
    const selectedShapeRef = useRef<fabric.Object | null>(null);

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
        const shape = selectedShapeRef.current;

        if (!canvas) return;
        if (!shape || selectedTool !== "shape") return;

        shape
            .set({
                height: formatToFix(selectedToolOption.shapeHeight),
                width: formatToFix(selectedToolOption.shapeWidth),
                top: formatToFix(selectedToolOption.shapeTop),
                left: formatToFix(selectedToolOption.shapeLeft),
                fill: selectedToolOption.shapeFill,
                strokeWidth: formatToFix(selectedToolOption.shapeBorderWidth),
                stroke: selectedToolOption.shapeBorderColor,
            })
            .setCoords();

        canvas?.renderAll();
    }, [selectedToolOption]);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) return;

        const startDrawing = (options: any) => {
            if (selectedTool !== "shape") return;

            const selectedShapeType = selectedToolOption?.shapeTarget;
            canvas.selection = false;

            if (options?.target) {
                // if (selectedShapeRef.current !== options?.target) {
                //     setSelectedToolOption((prevOptions: any) => ({
                //         ...prevOptions,
                //         shapeHeight: formatToFix(options?.target?.height * options?.target?.scaleY),
                //         shapeWidth: formatToFix(options?.target?.width * options?.target?.scaleX),
                //         shapeTop: formatToFix(options?.target?.top),
                //         shapeLeft: formatToFix(options?.target?.left),
                //         shapeFill: options?.target?.fill,
                //         shapeBorderWidth: options?.target?.strokeWidth,
                //         shapeBorderColor: options?.target?.stroke,
                //     }));
                //     selectedShapeRef.current = options?.target;
                // }
            } else {
                if (selectedShapeType) {
                    const pointer = canvas.getPointer(options.e);
                    let shape: fabric.Object | null = null;

                    const shapeOptions = {
                        left: pointer.x,
                        top: pointer.y,
                        strokeWidth: selectedToolOption.shapeBorderWidth || 0,
                        stroke: selectedToolOption.shapeBorderColor || "transparent",
                        fill: selectedToolOption.shapeFill || "black",
                        selectable: true,
                        evented: true,
                    };

                    if (selectedShapeType === "rect") {
                        shape = new fabric.Rect({ ...shapeOptions, width: 1, height: 1 });
                    } else if (selectedShapeType === "ellipse") {
                        shape = new fabric.Ellipse({ ...shapeOptions, rx: 1, ry: 1 });
                    } else if (selectedShapeType === "triangle") {
                        shape = new fabric.Triangle({ ...shapeOptions, width: 1, height: 1 });
                    }

                    if (shape) {
                        canvas.add(shape);
                        currentShapeRef.current = shape;
                    }
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
                let isTooSmall = false;

                if (shape instanceof fabric.Ellipse) {
                    isTooSmall =
                        Number(shape?.rx) * Number(shape?.scaleX) <= 2 ||
                        Number(shape?.ry) * Number(shape?.scaleY) <= 2;
                } else {
                    isTooSmall = shape.getScaledWidth() <= 2 || shape.getScaledHeight() <= 2;
                }

                if (isTooSmall) {
                    canvasRef.current?.remove(shape);
                } else {
                    shape.set({ selectable: true, evented: true });
                    canvasRef.current?.setActiveObject(shape);
                }

                currentShapeRef.current = null;
            }

            canvasRef.current?.renderAll();
            canvas.selection = true;
        };

        canvas.on("mouse:down", startDrawing);
        canvas.on("mouse:move", continueDrawing);
        canvas.on("mouse:up", finishDrawing);

        return () => {
            canvas.off("mouse:down", startDrawing);
            canvas.off("mouse:move", continueDrawing);
            canvas.off("mouse:up", finishDrawing);
        };
    }, [canvasRef, selectedTool, selectedToolOption?.shapeTarget]);

    const handleOnShapeTool = () => {
        setSelectedTool("shape");

        if (!selectedToolOption?.shapeTarget)
            setSelectedToolOption((prevOptions: any) => ({
                ...prevOptions,
                shapeTarget: "rect",
            }));
    };

    return { handleOnShapeTool };
};

export default useShapeTool;
