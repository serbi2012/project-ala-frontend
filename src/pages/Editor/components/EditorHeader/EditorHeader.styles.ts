import { styled } from "styled-components";

export const MainWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0px 10px;
    width: 100%;
    gap: 10px;
    background-color: var(--brand-secondary-dark);
    z-index: 99999 !important;
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
        background-color: var(--brand-secondary-dark);
        transition: all ease 0.1s;
        user-select: none;
        cursor: pointer;

        &:hover {
            background-color: var(--brand-secondary-dark-hover);
        }

        &:active {
            background-color: var(--brand-secondary-dark-active);
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
        color: var(--brand-secondary-dark);
    }

    &:hover {
        scale: 1.1;
        border: 1px solid white;
        background-color: var(--brand-secondary-dark);

        & > svg {
            color: white;
        }
    }

    &:active {
        scale: 0.9;
        border: 1px solid white;
        background-color: var(--brand-secondary-dark-active);

        & > svg {
            color: white;
        }
    }
`;
