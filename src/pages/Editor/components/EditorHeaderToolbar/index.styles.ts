import { styled } from "styled-components";

export const MainWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0px 10px;
    min-height: 40px;
    width: 100%;
    gap: 10px;
    background-color: var(--brand-primary-gray);
    z-index: 99999 !important;
`;

export const IconWrapper = styled.div<{ isActive?: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 30px;
    border-radius: 5px;
    user-select: none;
    cursor: pointer;
    transition: all ease 0.2s;
    background-color: ${({ isActive }) => (isActive ? "white" : "transparent")};

    & > svg {
        color: ${({ isActive }) => (isActive ? "var(--brand-primary-gray)" : "white")};
    }

    &:hover {
        scale: 1.1;
        border: 1px solid white;
        background-color: ${({ isActive }) => (isActive ? "white" : "transparent")};

        & > svg {
            color: ${({ isActive }) => (isActive ? "var(--brand-primary-gray)" : "white")};
        }
    }

    &:active {
        scale: 0.9;
        border: 1px solid white;
        background-color: ${({ isActive }) => (isActive ? "white" : "transparent")};

        & > svg {
            color: ${({ isActive }) => (isActive ? "var(--brand-primary-gray)" : "white")};
        }
    }
`;

export const VerticalLine = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25px;
    width: 0px;
    user-select: none;
    border-right: 1px solid white;
`;
