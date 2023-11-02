import { T } from "../../../../styles/TextGuide.styles";
import * as S from "./EditorHeader.styles";
import HomeIcon from "@mui/icons-material/Home";

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

const EditorHeader: React.FC = () => {
    return (
        <S.MainWrapper>
            <S.IconWrapper>
                <HomeIcon />
            </S.IconWrapper>
            <S.TextWrapper>
                {HEADER_MENU_ITEMS?.map((item, index) => <T.Body2 key={index}>{item?.title}</T.Body2>)}
            </S.TextWrapper>
        </S.MainWrapper>
    );
};

export default EditorHeader;
