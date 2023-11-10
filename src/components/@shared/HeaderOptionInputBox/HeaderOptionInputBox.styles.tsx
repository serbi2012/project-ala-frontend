import { styled } from "styled-components";

export const OptionInputBox = styled.div<{ width?: number }>`
    display: flex;
    justify-content: flex-start;
    align-items: center;

    & > input {
        margin-left: 5px;
        padding: 5px 45px 5px 5px;
        text-align: right;
        width: ${({ width }) => (width ? `${width}px` : "auto")};
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
