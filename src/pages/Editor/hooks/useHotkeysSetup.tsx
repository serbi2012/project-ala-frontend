import useCustomHotkeys from "../../../hooks/common/useCustomHotkeys";
import useCommonFeature from "../../../hooks/feature/useCommonFeature";
import { ICanvasRef } from "../../../types/canvasRef";

export const useHotkeysSetup = ({ canvasRef }: ICanvasRef) => {
    const { handleCopyShape, handleDeleteShape, handlePasteShape, handleRotateShape } = useCommonFeature({
        canvasRef,
    });

    // OS 감지하여 Meta(Mac) 또는 Control(Windows/Linux) 단축키 사용
    const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;

    useCustomHotkeys("Delete", handleDeleteShape);
    useCustomHotkeys(isMac ? "Meta+Backspace" : "Delete", handleDeleteShape);
    useCustomHotkeys("Control+KeyR", handleRotateShape);

    // OS에 따른 단축키 설정
    if (isMac) {
        useCustomHotkeys("Meta+KeyC", handleCopyShape);
        useCustomHotkeys("Meta+KeyV", handlePasteShape);
    } else {
        useCustomHotkeys("Control+KeyC", handleCopyShape);
        useCustomHotkeys("Control+KeyV", handlePasteShape);
    }
};
