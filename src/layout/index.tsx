import * as S from "./index.styles";
import { isLoadingState } from "../recoil/atoms";
import { useRecoilState } from "recoil";
import { CircularProgress, IconButton } from "@mui/material";
import { SnackbarProvider } from "notistack";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useRef } from "react";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";

export interface IProps {
    children: JSX.Element;
}

const isExistSidebar = ["/"];

const Layout: React.FC<IProps> = (props: IProps) => {
    const notistackRef = useRef<any>();

    const [isLoading] = useRecoilState(isLoadingState);

    const location = useLocation();

    const action = (key: any) => (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => {
                notistackRef.current.closeSnackbar(key);
            }}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    );

    return (
        <SnackbarProvider
            iconVariant={{
                success: <ThumbUpOffAltOutlinedIcon />,
                error: <ErrorOutlineOutlinedIcon />,
                warning: <ReportProblemOutlinedIcon />,
            }}
            ref={notistackRef}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            maxSnack={3}
            autoHideDuration={3000}
            action={action}
        >
            <S.MainWrapper>
                {isExistSidebar.includes(location?.pathname) && <Sidebar />}
                <S.ContentWrapper>
                    {/* NOTE - 로딩 프로그레스 컨테이너 */}
                    {isLoading && (
                        <S.LoadingContainer>
                            <CircularProgress style={{ scale: "4" }} />
                        </S.LoadingContainer>
                    )}
                    {props.children}
                </S.ContentWrapper>
            </S.MainWrapper>
        </SnackbarProvider>
    );
};

export default Layout;
