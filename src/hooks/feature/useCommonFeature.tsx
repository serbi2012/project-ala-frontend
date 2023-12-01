import { MutableRefObject, useRef } from "react";

interface IUseCommonFeatureTool {
    canvasRef: MutableRefObject<fabric.Canvas>;
}

const useCommonFeature = ({ canvasRef }: IUseCommonFeatureTool) => {
    const copiedObjectRef = useRef<any>(null);

    const handleDeleteShape = () => {
        const canvas = canvasRef.current;

        const activeObjects = canvas?.getActiveObjects();

        if (activeObjects && activeObjects.length > 0) {
            activeObjects.forEach((object: fabric.Object) => {
                canvas.remove(object);
            });

            canvas.discardActiveObject();
        } else {
            const activeObject = canvas?.getActiveObject();
            if (activeObject) {
                canvas.remove(activeObject);
                canvas.discardActiveObject();
            }
        }

        canvas?.renderAll();
    };

    const handleRotateShape = () => {
        const canvas = canvasRef.current;
        const activeObject = canvas?.getActiveObject();

        if (activeObject) {
            activeObject.rotate((activeObject.angle || 0) + 90);
            activeObject.setCoords();
            canvas.renderAll();
        }
    };

    const handleCopyShape = () => {
        if (!copiedObjectRef) return;

        const canvas = canvasRef.current;
        const activeObject = canvas?.getActiveObject();

        copiedObjectRef.current = activeObject;
    };

    const handlePasteShape = () => {
        const canvas = canvasRef.current;
        const activeObject = copiedObjectRef.current;

        if (activeObject && activeObject.clone) {
            activeObject.clone((cloned: any) => {
                canvas.add(
                    cloned.set({
                        left: cloned.left + 10,
                        top: cloned.top + 10,
                        evented: true,
                    }),
                );
                canvas.setActiveObject(cloned);
                canvas.renderAll();
            });
        }
    };

    const handleCopyAndPasteShape = () => {
        const canvas = canvasRef.current;
        const activeObject = canvas?.getActiveObject();

        if (activeObject && activeObject.clone) {
            activeObject.clone((cloned: any) => {
                canvas.add(
                    cloned.set({
                        left: cloned.left + 10,
                        top: cloned.top + 10,
                        evented: true,
                    }),
                );
                canvas.setActiveObject(cloned);
                canvas.renderAll();
            });
        }
    };

    return { handleDeleteShape, handleRotateShape, handleCopyShape, handlePasteShape, handleCopyAndPasteShape };
};

export default useCommonFeature;
