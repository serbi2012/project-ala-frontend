import { styled } from "styled-components";

export const OptionInputBox = styled.div<{ width?: number; suffix?: string }>`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    max-width: ${({ width }) => (width ? `${width + 10}px` : "auto")};

    & > input {
        margin-left: 5px;
        padding: ${({ suffix }) => (suffix ? "5px 25px 5px 5px" : "5px 45px 5px 5px")};
        text-align: right;
        width: ${({ width }) => (width ? `${width}px` : "auto")};
        background-color: transparent;
        color: white;
        border: 2px solid var(--header-input-color);
        border-radius: 5px;
    }
    &:hover {
        & > input {
            border: 2px solid var(--header-input-color-hover);
        }
    }

    &:focus {
        & > input {
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

export const InputPrefix = styled.div`
    transform: translateX(25px);
    color: #c8c8c8;
`;

export const InputSuffix = styled.div`
    transform: translateX(-45px);
    color: white;
`;

export const InputInvertedTriangle = styled.div<{ suffix?: string }>`
    width: 0;
    height: 0;
    border-bottom: 8px solid transparent;
    border-top: 8px solid white;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    transform: ${({ suffix }) => (suffix ? "translate(-20px, 5px)" : "translate(-37px, 5px)")};
`;
