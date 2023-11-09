import { createGlobalStyle } from "styled-components";

const styled = { createGlobalStyle };

export const GlobalStyle = styled.createGlobalStyle`
    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        appearance: none;
    }

    :root {
        --brand-primary-dark: #3e414a;
        --brand-primary-gray: #606b73;
        --brand-secondary-dark: #313a40;
        --brand-secondary-dark-hover: #2f3438;
        --brand-secondary-dark-active: #474f55;
        --workspace-color: #171719;
    }

    h1,
    h2,
    h3,
    h4 {
        font-family: "Noto Sans KR";
        color: #000000;
    }

    h1,
    h2 {
        font-size: 20px;
        line-height: 29px;
    }

    h3,
    h4 {
        font-size: 18px;
        line-height: 26px;
    }

    h1,
    h3 {
        font-weight: 700;
    }

    h2,
    h4 {
        font-weight: 400;
    }

    a {
        text-decoration: none;
        color: black;
    }

    .center-align {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    ::-webkit-scrollbar {
        width: 16px;
    }

    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: #888;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`;
