import { useRecoilState } from "recoil";
import { selectedToolState } from "../../recoil/atoms/selectedToolState";
import { ICanvasRef } from "../../types/canvasRef";

const useSelectTool = ({ canvasRef }: ICanvasRef) => {
    const [, setSelectedTool] = useRecoilState(selectedToolState);

    const handleOnSelectTool = () => {
        const canvas = canvasRef?.current;

        if (canvas) {
            canvas.isDrawingMode = false;
            canvas.selection = true;

            setSelectedTool("select");

            canvas.forEachObject((obj: any) => {
                obj.set({ selectable: true, evented: true });
            });

            canvas.renderAll();
        }
    };

    return { handleOnSelectTool };
};

export default useSelectTool;
