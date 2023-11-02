import { styled } from "styled-components";

export const MainWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    min-height: 100vh;
    width: 100%;
`;

export const ContentWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    width: 100%;
`;

export const LoadingContainer = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: #00000020;
    z-index: 100000;
`;
