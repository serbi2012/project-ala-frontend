import { styled } from "styled-components";

export const MainWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

export const OptionBox = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;

    & > p {
        color: white;
    }
`;

export const OptionInputBox = styled.div<{ width?: number }>`
    display: flex;
    justify-content: flex-start;
    align-items: center;

    & > input {
        margin-left: 5px;
        padding: 5px 45px 5px 5px;
        text-align: right;
        max-width: ${({ width }) => (width ? `${width}px` : "auto")};
        background-color: transparent;
        color: white;
        border: 2px solid var(--header-input-color);
        border-radius: 5px;

        &:hover {
            border: 2px solid var(--header-input-color-hover);
        }

        &:focus {
            border: 2px solid var(--header-input-color-focus);
            outline: none;
        }
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
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
