import * as S from "./index.styles";
import MainIntroBox from "./components/MainIntroBox";
import MainStartBox from "./components/MainStartBox";

const Main: React.FC = () => {
    return (
        <S.MainWrapper>
            <MainIntroBox />
            <MainStartBox />
        </S.MainWrapper>
    );
};

export default Main;
