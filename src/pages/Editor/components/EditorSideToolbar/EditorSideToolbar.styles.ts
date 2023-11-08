import { styled } from "styled-components";

export const MainWrapper = styled.div`
    display: grid;
    justify-content: center;
    align-items: flex-start;
    padding: 10px;
    height: calc(100vh - 80px);
    width: 100px;
    grid-template-columns: repeat(2, 30px);
    grid-template-rows: repeat(19, 30px);
    border-top: 2px solid white;
    border-top-right-radius: 10px;
    gap: 15px;
    background-color: #606b73;
`;

export const IconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 30px;
    border-radius: 5px;
    user-select: none;
    cursor: pointer;
    transition: all ease 0.2s;

    & > svg {
        color: white;
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
