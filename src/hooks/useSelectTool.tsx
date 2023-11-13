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

            setSelectedTool("select");
        }
    };

    return { handleOnSelectTool };
};

export default useSelectTool;
