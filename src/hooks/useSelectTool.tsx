import { MutableRefObject } from "react";
import { useRecoilState } from "recoil";
import { selectedToolState } from "../recoil/atoms/selectedToolState";

interface IUseSelectTool {
    canvasRef?: MutableRefObject<fabric.Canvas> | any;
}

const useSelectTool = ({ canvasRef }: IUseSelectTool) => {
    const [, setSelectedTool] = useRecoilState(selectedToolState);

    const handleOnSelectTool = () => {
        const canvas = canvasRef?.current;

        if (canvas) {
            canvas.isDrawingMode = false;
            canvas.selection = true;

            setSelectedTool("select");

            canvas.forEachObject((obj: any) => {
                obj.set({
                    selectable: true,
                    evented: true,
                });
            });

            canvas.renderAll();
        }
    };

    return { handleOnSelectTool };
};

export default useSelectTool;
