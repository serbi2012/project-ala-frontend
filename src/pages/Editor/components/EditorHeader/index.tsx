import { T } from "../../../../styles/textGuides.styles";
import * as S from "./index.styles";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { ICanvasRef } from "../../../../types/canvasRef";
import { selectedToolState } from "../../../../recoil/atoms/selectedToolState";
import { useRecoilState } from "recoil";

const HEADER_MENU_ITEMS = [
    { title: "파일" },
    { title: "편집" },
    { title: "페이지" },
    { title: "레이어" },
    { title: "선택" },
    { title: "조정" },
    { title: "필터" },
    { title: "보기" },
    { title: "도움" },
];

const EditorHeader = ({ canvasRef }: ICanvasRef) => {
    const [, setSelectedTool] = useRecoilState(selectedToolState);
    canvasRef;

    return (
        <S.MainWrapper>
            <Link
                to="/"
                onClick={() => {
                    setSelectedTool("");
                }}
            >
                <S.IconWrapper>
                    <HomeIcon />
                </S.IconWrapper>
            </Link>
            <S.TextWrapper>
                {HEADER_MENU_ITEMS?.map((item, index) => <T.Body2 key={index}>{item?.title}</T.Body2>)}
            </S.TextWrapper>
        </S.MainWrapper>
    );
};

export default EditorHeader;
