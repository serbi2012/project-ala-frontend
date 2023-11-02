import * as S from "./Main.styles";
import MainIntroBox from "./components/MainIntroBox/MainIntroBox.component";
import MainStartBox from "./components/MainStartBox/MainStartBox.component";

const Main: React.FC = () => {
    return (
        <S.MainWrapper>
            <MainIntroBox />
            <MainStartBox />
        </S.MainWrapper>
    );
};

export default Main;
