import { styled } from "styled-components";

export const MainWrapper = styled.div`
    display: grid;
    justify-content: center;
    align-items: flex-start;
    padding: 10px;
    height: calc(100vh - 85px);
    width: 100px;
    grid-template-columns: repeat(2, 30px);
    grid-template-rows: repeat(19, 30px);
    margin-top: 5px;
    border-top-right-radius: 10px;
    gap: 15px;
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
