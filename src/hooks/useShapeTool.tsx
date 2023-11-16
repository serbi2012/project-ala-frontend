import { MutableRefObject, useRef, useEffect, useState } from "react";
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

    const [selectedShape, setSelectedShape] = useState<fabric.Object | null>(null);

    const currentShapeRef = useRef<fabric.Object | null>(null);

    const setShapeData = (shape: fabric.Object | null) => {
        setSelectedToolOption((prevOptions: any) => ({
            ...prevOptions,
            shapeTotalHeight: formatToFix(Number(shape?.height) * Number(shape?.scaleY)),
            shapeTotalWidth: formatToFix(Number(shape?.width) * Number(shape?.scaleX)),
            shapeHeight: Number(shape?.height),
            shapeWidth: Number(shape?.width),
            shapeScaleY: Number(shape?.scaleY),
            shapeScaleX: Number(shape?.scaleX),
            shapeTop: formatToFix(Number(shape?.top)),
            shapeLeft: formatToFix(Number(shape?.left)),
            shapeFill: shape?.fill,
            shapeBorderWidth: Number(shape?.strokeWidth),
            shapeBorderColor: shape?.stroke,
        }));
    };

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
        setShapeData(selectedShape);
    }, [selectedShape]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const shape = selectedShape;
        const {
            shapeTotalHeight,
            shapeTotalWidth,
            shapeTop,
            shapeLeft,
            shapeFill,
            shapeBorderWidth,
            shapeBorderColor,
        } = selectedToolOption;

        if (!canvas) return;
        if (!shape || selectedTool !== "shape") return;
        if (!shapeTop && !shapeLeft) return;

        shape
            .set({
                height: formatToFix(shapeTotalHeight),
                width: formatToFix(shapeTotalWidth),
                scaleY: 1,
                scaleX: 1,
                top: formatToFix(shapeTop),
                left: formatToFix(shapeLeft),
                fill: shapeFill,
                strokeWidth: formatToFix(shapeBorderWidth),
                stroke: shapeBorderColor,
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
            const target = options?.target;

            canvas.selection = false;

            if (target) {
                if (selectedShape !== target) {
                    setSelectedShape(target);
                }
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

        const finishDrawing = (options: any) => {
            if (selectedTool !== "shape") return;

            const shape = currentShapeRef.current;

            let isTooSmall = false;

            if (shape) {
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
                    setSelectedShape(shape);
                }

                currentShapeRef.current = null;
            }
            setShapeData((shape && isTooSmall) || options?.target || null);

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
