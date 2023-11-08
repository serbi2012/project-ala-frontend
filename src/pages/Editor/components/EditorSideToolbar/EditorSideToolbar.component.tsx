import * as S from "./EditorSideToolbar.styles";
import NearMeIcon from "@mui/icons-material/NearMe";

const EditorSideToolbar: React.FC = () => {
    return (
        <S.MainWrapper>
            {Array(10)
                .fill(0)
                ?.map(({ index }) => (
                    <S.IconWrapper key={index}>
                        <NearMeIcon />
                    </S.IconWrapper>
                ))}
        </S.MainWrapper>
    );
};

export default EditorSideToolbar;
