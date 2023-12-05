import { MutableRefObject } from "react";
import { useRecoilState } from "recoil";
import { selectedToolOptionState, selectedToolState } from "../../../../../../recoil/atoms/selectedToolState";
import { shapeTargetSelector } from "../../../../../../recoil/selectors/selectedToolSelector";
import * as S from "./index.styles";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import SquareOutlinedIcon from "@mui/icons-material/SquareOutlined";
import ChangeHistoryOutlinedIcon from "@mui/icons-material/ChangeHistoryOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import useCommonFeature from "../../../../../../hooks/feature/useCommonFeature";
import { T } from "../../../../../../styles/textGuides.styles";
import HeaderOptionInputBox from "../../../../../../components/@shared/HeaderOptionInputBox";

interface IInputOption {
    inputType: string;
    option: string;
    prefix?: string;
    suffix?: string;
    isArrow?: boolean;
    width?: number;
}

interface IHeaderToolItem {
    type: "icon" | "input";
    name?: string;
    option?: string;
    IconComponent?: any;
    action?: () => void;
    inputOptions?: IInputOption[];
}

interface IHeaderToolItemsProps {
    canvasRef: MutableRefObject<fabric.Canvas>;
}

const HeaderToolItems = ({ canvasRef }: IHeaderToolItemsProps) => {
    const [selectedTool] = useRecoilState(selectedToolState);
    const [selectedToolOption] = useRecoilState<any>(selectedToolOptionState);

    const [, setShapeTarget] = useRecoilState(shapeTargetSelector);

    const { handleDeleteShape, handleRotateShape, handleCopyAndPasteShape } = useCommonFeature({ canvasRef });

    const HEADER_TOOL_ITEMS_MAP: Record<string, IHeaderToolItem[]> = {
        drawing: [
            {
                name: "두께",
                type: "input",
                inputOptions: [{ inputType: "number", option: "width", suffix: "px", isArrow: true }],
            },
            {
                name: "색상",
                type: "input",
                inputOptions: [{ inputType: "color", option: "color", width: 40 }],
            },
        ],
        shape: [
            {
                type: "icon",
                option: "ellipse",
                IconComponent: CircleOutlinedIcon,
            },
            {
                type: "icon",
                option: "rect",
                IconComponent: SquareOutlinedIcon,
            },
            {
                type: "icon",
                option: "triangle",
                IconComponent: ChangeHistoryOutlinedIcon,
            },
            {
                name: "크기",
                type: "input",
                inputOptions: [
                    { option: "shapeTotalHeight", inputType: "number", prefix: "H", suffix: "px", width: 150 },
                    { option: "shapeTotalWidth", inputType: "number", prefix: "W", suffix: "px", width: 150 },
                ],
            },
            {
                name: "위치",
                type: "input",
                inputOptions: [
                    { option: "shapeTop", inputType: "number", prefix: "Y", width: 130 },
                    { option: "shapeLeft", inputType: "number", prefix: "W", width: 130 },
                ],
            },
            {
                name: "색상",
                type: "input",
                inputOptions: [{ option: "shapeFill", inputType: "color", width: 40 }],
            },
            {
                name: "테두리 두께",
                type: "input",
                inputOptions: [{ option: "shapeBorderWidth", inputType: "number", suffix: "px", isArrow: true }],
            },
            {
                name: "테두리 색상",
                type: "input",
                inputOptions: [{ option: "shapeBorderColor", inputType: "color", width: 40 }],
            },
            {
                type: "icon",
                action: handleDeleteShape,
                IconComponent: DeleteForeverIcon,
            },
            {
                type: "icon",
                action: handleRotateShape,
                IconComponent: RotateRightIcon,
            },
            {
                type: "icon",
                action: handleCopyAndPasteShape,
                IconComponent: ContentCopyIcon,
            },
        ],
    };

    return (
        <S.MainWrapper>
            {HEADER_TOOL_ITEMS_MAP[selectedTool]?.map((item, index) => {
                if (item.type === "icon" && item.IconComponent) {
                    return (
                        <S.IconWrapper
                            key={index}
                            isActive={selectedToolOption?.shapeTarget === item.option}
                            onClick={item.option ? () => setShapeTarget(item.option) : item.action}
                        >
                            <item.IconComponent />
                        </S.IconWrapper>
                    );
                } else if (item.type === "input" && item.inputOptions) {
                    return (
                        <S.OptionBox key={index}>
                            <T.Body2>{item.name}:</T.Body2>
                            {item.inputOptions.map((inputItem, inputIndex) => (
                                <HeaderOptionInputBox
                                    key={inputIndex}
                                    option={inputItem.option}
                                    type={inputItem.inputType}
                                    prefix={inputItem.prefix}
                                    suffix={inputItem.suffix}
                                    isArrow={inputItem.isArrow}
                                    width={inputItem.width}
                                />
                            ))}
                        </S.OptionBox>
                    );
                }
            })}
        </S.MainWrapper>
    );
};
export default HeaderToolItems;
