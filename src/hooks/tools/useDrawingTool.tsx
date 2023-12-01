import { useRecoilState } from "recoil";
import { selectedToolOptionState, selectedToolState } from "../../recoil/atoms/selectedToolState";
import { ICanvasRef } from "../../types/canvasRef";

const useDrawingTool = ({ canvasRef }: ICanvasRef) => {
    const [, setSelectedTool] = useRecoilState(selectedToolState);
    const [selectedToolOption, setSelectedToolOption] = useRecoilState<any>(selectedToolOptionState);

    const handleOnDrawingTool = () => {
        const canvas = canvasRef?.current;

        if (canvas) {
            canvas.isDrawingMode = true;
            canvas.freeDrawingBrush.color = selectedToolOption?.color ? String(selectedToolOption?.color) : "black";
            canvas.freeDrawingBrush.width = selectedToolOption?.width ? Number(selectedToolOption?.width) : 2;

            if (!selectedToolOption?.width) {
                setSelectedToolOption((prev: any) => {
                    return { ...prev, width: 2 };
                });
            }

            if (!selectedToolOption?.color) {
                setSelectedToolOption((prev: any) => {
                    return { ...prev, color: "black" };
                });
            }

            setSelectedTool("drawing");
        }
    };

    return { handleOnDrawingTool };
};

export default useDrawingTool;
