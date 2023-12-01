import * as S from "./Main.styles";
import MainIntroBox from "./components/MainIntroBox/MainIntroBox";
import MainStartBox from "./components/MainStartBox/MainStartBox";

const Main: React.FC = () => {
    return (
        <S.MainWrapper>
            <MainIntroBox />
            <MainStartBox />
        </S.MainWrapper>
    );
};

export default Main;
