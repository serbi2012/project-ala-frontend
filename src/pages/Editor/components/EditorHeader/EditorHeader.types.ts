import { MutableRefObject } from "react";
import { fabric } from "fabric";

export interface IEditorHeaderProps {
    canvasRef?: MutableRefObject<fabric.Canvas> | any;
}
