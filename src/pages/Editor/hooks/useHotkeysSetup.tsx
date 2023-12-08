import useCustomHotkeys from "../../../hooks/common/useCustomHotkeys";
import useCommonFeature from "../../../hooks/feature/useCommonFeature";
import { ICanvasRef } from "../../../types/canvasRef";

export const useHotkeysSetup = ({ canvasRef }: ICanvasRef) => {
    const { handleCopyShape, handleDeleteShape, handlePasteShape, handleRotateShape } = useCommonFeature({
        canvasRef,
    });

    // OS 감지하여 Meta(Mac) 또는 Control(Windows/Linux) 단축키 사용
    const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;

    useCustomHotkeys(isMac ? "Meta+Backspace" : "Delete", handleDeleteShape); // NOTE - 선택한 객체 삭제
    useCustomHotkeys("Control+KeyR", handleRotateShape); // NOTE - 선택한 객체 오른쪽으로 90도 회전
    useCustomHotkeys(isMac ? "Meta+KeyC" : "Control+KeyC", handleCopyShape); // NOTE - 선택한 객체 복사
    useCustomHotkeys(isMac ? "Meta+KeyV" : "Control+KeyV", handlePasteShape); // NOTE - 선택한 객체 붙혀넣기
};
