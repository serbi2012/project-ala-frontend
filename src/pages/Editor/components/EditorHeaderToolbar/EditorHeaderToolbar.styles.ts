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

export const IconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 30px;
    user-select: none;

    & > svg {
        color: white;
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

export const OptionBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    & > p {
        color: white;
    }
`;

export const OptionInputBox = styled.div`
    & > input {
        margin-left: 5px;
        padding: 5px 15px 5px 5px;
        text-align: right;
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
`;
