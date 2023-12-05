import { T } from "../../styles/textGuides.styles";
import * as S from "./index.styles";
import HomeIcon from "@mui/icons-material/Home";

const SIDEBAR_MENU_ITEMS = [{ icon: <HomeIcon />, title: "Home", link: "/" }];

const Sidebar: React.FC = () => {
    return (
        <S.MainWrapper>
            {SIDEBAR_MENU_ITEMS?.map((item: any, index) => (
                <S.IconWrapper key={index} to={item?.link}>
                    {item?.icon}
                    <T.Menu1>{item?.title}</T.Menu1>
                </S.IconWrapper>
            ))}
        </S.MainWrapper>
    );
};

export default Sidebar;
