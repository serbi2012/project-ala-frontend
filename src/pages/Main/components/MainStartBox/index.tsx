import { Button } from "@mui/material";
import * as S from "./index.styles";
import { T } from "../../../../styles/textGuides.styles";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Link } from "react-router-dom";

const MainStartBox: React.FC = () => {
    return (
        <S.MainWrapper>
            <T.Title1>작업 목록</T.Title1>
            <Link to="/editor">
                <Button variant="contained" size="large" startIcon={<AddBoxIcon />}>
                    신규작업
                </Button>
            </Link>
        </S.MainWrapper>
    );
};

export default MainStartBox;
