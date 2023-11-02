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
        --brand-secondary-white: #fff;
        --grayscale-gray1: #777;
        --grayscale-gray2: #dadada;
        --grayscale-gray3: #f9f9f9;
        --grayscale-gray4: #999;
        --color-whitesmoke-100: #f6f6f6;
        --color-whitesmoke-200: #f3f3f3;
        --color-gainsboro-100: #d9d9d9;
        --color-gainsboro-200: #e4e4e4;
        --color-silver: #bdbbbb;
        --color-black: #000;
        --color-firebrick: #d64242;
        --color-mistyrose: #fedfdf;
        --brand-secondary-bggray: #f3f3f6;
        --brand-primary-skyblue: #1ea2d9;
        --brand-primary-darknavy: #3e414a;
        --brand-primary-navy: #1d2d5a;
        --brand-secondary-light-sky-blue: #f1f8fc;
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
