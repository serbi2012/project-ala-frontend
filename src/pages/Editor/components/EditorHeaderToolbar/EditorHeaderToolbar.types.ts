import { MutableRefObject } from "react";
import { fabric } from "fabric";

export interface IEditorHeaderToolbarProps {
    canvasRef?: MutableRefObject<fabric.Canvas> | any;
}
