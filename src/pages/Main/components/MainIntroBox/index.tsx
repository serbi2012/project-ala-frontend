import { T } from "../../../../styles/textGuides.styles";
import * as S from "./index.styles";
import logo from "./../../../../../public/logo.svg";

const MainIntroBox: React.FC = () => {
    return (
        <S.MainWrapper>
            <S.LogoImage src={logo} />
            <S.TextWrapper>
                <T.Title3>Project ALA</T.Title3>
                <T.Subtitle1>Wings to your imagination and idea</T.Subtitle1>
            </S.TextWrapper>
        </S.MainWrapper>
    );
};

export default MainIntroBox;
