import { styled } from "styled-components";

export const MainWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0px 10px;
    width: 100%;
    gap: 10px;
    background-color: #606b73;
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
        background-color: #606b73;
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
    border-radius: 5px;
    background-color: white;
    user-select: none;
    cursor: pointer;
    transition: all ease 0.2s;

    & > svg {
        color: #606b73;
    }

    &:hover {
        scale: 1.1;
        border: 1px solid white;
        background-color: #606b73;

        & > svg {
            color: white;
        }
    }

    &:active {
        scale: 0.9;
        border: 1px solid white;
        background-color: #606b73;

        & > svg {
            color: white;
        }
    }
`;
