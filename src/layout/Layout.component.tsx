import * as S from "./Layout.styles";
import { IProps } from "./Layout.types";
import { isLoadingState } from "../recoil/atoms";
import { useRecoilState } from "recoil";
import { CircularProgress, IconButton } from "@mui/material";
import { SnackbarProvider } from "notistack";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useRef } from "react";

const Layout: React.FC<IProps> = (props: IProps) => {
    const notistackRef = useRef<any>();

    const [isLoading] = useRecoilState(isLoadingState);

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
                {/* NOTE - 로딩 프로그레스 컨테이너 */}
                {isLoading && (
                    <S.LoadingContainer>
                        <CircularProgress style={{ scale: "4" }} />
                    </S.LoadingContainer>
                )}

                {/* NOTE - 컨텐츠 영역 */}
                <S.ContentWrapper>{props.children}</S.ContentWrapper>
            </S.MainWrapper>
        </SnackbarProvider>
    );
};

export default Layout;
