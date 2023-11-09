import { MutableRefObject } from "react";
import { fabric } from "fabric";

export interface IEditorSideToolbarProps {
    canvasRef?: MutableRefObject<fabric.Canvas> | any;
}
