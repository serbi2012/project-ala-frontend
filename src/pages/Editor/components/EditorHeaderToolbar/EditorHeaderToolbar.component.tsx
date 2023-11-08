import * as S from "./EditorHeaderToolbar.styles";
import NearMeIcon from "@mui/icons-material/NearMe";

const EditorHeaderToolbar: React.FC = () => {
    return (
        <S.MainWrapper>
            <S.IconWrapper>
                <NearMeIcon />
            </S.IconWrapper>
            <S.VerticalLine />
        </S.MainWrapper>
    );
};

export default EditorHeaderToolbar;
