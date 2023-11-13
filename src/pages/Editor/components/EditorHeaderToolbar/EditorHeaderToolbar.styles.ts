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
    z-index: 9999999 !important;
`;

export const TextWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;

    & > p {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0px 10px;
        height: 40px;
        color: white;
        background-color: var(--brand-primary-gray);
        transition: all ease 0.1s;
        user-select: none;
        cursor: pointer;

        &:hover {
            background-color: #2f3438;
        }

        &:active {
            background-color: #474f55;
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

export const OptionContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

export const OptionBox = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;

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

export const InputSuffix = styled.div`
    transform: translateX(-45px);
    color: white;
`;

export const InputInvertedTriangle = styled.div`
    width: 0;
    height: 0;
    border-bottom: 8px solid transparent;
    border-top: 8px solid white;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    transform: translate(-37px, 5px);
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
