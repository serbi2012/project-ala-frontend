import { styled } from "styled-components";

export const MainWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    height: calc(100vh - 80px);
    width: 100vw;
`;

export const DrawingContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex: 1;
    height: 100%;
    width: 100vw;
    background-color: var(--workspace-color);
`;

export const FabricjsCanvasWrapper = styled.div`
    height: 100% !important;
    width: 100% !important;
`;
