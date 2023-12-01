import { MutableRefObject, useRef } from "react";
import { fabric } from "fabric";

interface IUseCommonFeatureTool {
    canvasRef: MutableRefObject<fabric.Canvas>;
}

const useCommonFeature = ({ canvasRef }: IUseCommonFeatureTool) => {
    const copiedObjectsRef = useRef<fabric.Object[]>([]);

    const handleDeleteShape = () => {
        const canvas = canvasRef.current;

        canvas.getActiveObjects().forEach((object) => {
            canvas.remove(object);
        });

        canvas.discardActiveObject().renderAll();
    };

    const handleRotateShape = () => {
        const canvas = canvasRef.current;

        canvas.getActiveObjects().forEach((object) => {
            object.rotate((object.angle || 0) + 90);
            object.setCoords();
        });

        canvas.requestRenderAll();
    };

    const handleCopyShape = () => {
        const canvas = canvasRef.current;
        copiedObjectsRef.current = canvas.getActiveObjects().map((object) => fabric.util.object.clone(object));
    };

    const handlePasteShape = () => {
        const canvas = canvasRef.current;
        const copiedObjects = copiedObjectsRef.current;

        if (!canvas || copiedObjects.length === 0) return;

        const pastedObjects: any[] = [];

        copiedObjects.forEach((copiedObject) => {
            copiedObject.clone((clonedObj: any) => {
                clonedObj.set({
                    left: clonedObj.left + 100,
                    top: clonedObj.top + 100,
                    evented: true,
                });
                canvas.add(clonedObj);
                pastedObjects.push(clonedObj);

                if (pastedObjects.length === copiedObjects.length) {
                    if (pastedObjects.length > 1) {
                        const activeSelection = new fabric.ActiveSelection(pastedObjects, {
                            canvas: canvas,
                        });
                        canvas.setActiveObject(activeSelection);
                    } else {
                        canvas.setActiveObject(pastedObjects[0]);
                    }
                    canvas.requestRenderAll();
                }
            });
        });
    };

    const handleCopyAndPasteShape = () => {
        handleCopyShape();
        handlePasteShape();
    };

    return { handleDeleteShape, handleRotateShape, handleCopyShape, handlePasteShape, handleCopyAndPasteShape };
};

export default useCommonFeature;
