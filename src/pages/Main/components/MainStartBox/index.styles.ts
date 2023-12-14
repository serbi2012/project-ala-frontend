import { styled } from "styled-components";

export const MainWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 20px;
    width: 100%;
    gap: 20px;
    border: 3px solid var(--brand-primary-gray);
    border-radius: 15px;
`;

export const ModalWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    height: 70vh;
    width: 50vw;
    gap: 20px;
    border: 2px solid var(--brand-primary-gray);
    background-color: var(--white-color);
    border-radius: 15px;
    transform: translate(-50%, -50%);
`;

export const HorizonLine = styled.div`
    width: 95%;
    border-top: 2px solid var(--brand-primary-gray);
`;

export const PageExampleContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    height: 65%;
    width: 100%;
    gap: 10px;
    overflow-y: scroll;
`;

export const PageBox = styled.div<{ isSelected: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    border-radius: 5px;
    background-color: ${({ isSelected }) => (isSelected ? "var(--brand-secondary-dark-active)" : "transparent")};
    transition: all 0.3s ease;
    user-select: none;
    cursor: pointer;

    & > p {
        color: ${({ isSelected }) => (isSelected ? "var(--white-color)" : "var(--brand-primary-dark)")};
    }

    &:hover {
        background-color: var(--brand-secondary-dark-hover);

        & > p {
            color: var(--white-color);
        }
    }

    &:active {
        background-color: var(--brand-secondary-dark-active);

        & > p {
            color: var(--white-color);
        }
    }
`;

export const PageExample = styled.div<{ ratio: string }>`
    height: 10vh;
    width: auto;
    background-color: var(--white-color);
    aspect-ratio: ${({ ratio }) => ratio};
    border: 2px solid var(--brand-primary-gray);
    border-radius: 2px;
`;
