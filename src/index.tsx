import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "./styles/globalStyles";
import { RecoilRoot } from "recoil";
import Layout from "./layout/Layout.component";
import { globalTheme } from "./styles/theme.styles";
import { ThemeProvider } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <>
        <BrowserRouter>
            <RecoilRoot>
                <ThemeProvider theme={globalTheme}>
                    <GlobalStyle />
                    <Layout>
                        <App />
                    </Layout>
                </ThemeProvider>
            </RecoilRoot>
        </BrowserRouter>
    </>,
);
