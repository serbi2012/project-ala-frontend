import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const MainWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    margin: 10px;
    padding: 10px;
    height: calc(100vh - 20px);
    width: 100px;
    border-radius: 15px;
    border: 3px solid var(--brand-primary-gray);
`;

export const IconWrapper = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: var(--brand-primary-gray);
    height: 70px;
    width: 70px;
    border-radius: 15px;

    & > p,
    & > svg {
        color: white;
    }
`;
