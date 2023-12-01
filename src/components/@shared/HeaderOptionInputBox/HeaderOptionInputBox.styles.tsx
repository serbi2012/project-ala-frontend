import { TextField } from "@mui/material";
import { styled } from "styled-components";

export const OptionInputBox = styled.div<{ width?: number; suffix?: string; type?: string; isArrow?: boolean }>`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    max-width: ${({ width }) => (width ? `${width + 10}px` : "auto")};

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

export const InputField = styled(TextField)<{ width?: number; suffix?: string; prefix?: string; type?: string }>`
    width: ${({ width }) => `${width}px`};

    input {
        padding: 4px 0px !important;
        padding-left: ${({ prefix, type }) => (prefix || type === "color" ? "0px" : "5px")} !important;
        padding-right: ${({ suffix, type }) => (suffix || type === "color" ? "0px" : "5px")} !important;
        text-align: right;
        color: var(--white-color);
    }

    .MuiInputAdornment-positionEnd {
        margin-left: 4px;
    }
`;

export const InputPrefix = styled.div`
    color: #c8c8c8;
`;

export const SliderWrapper = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0px 5px;
    background-color: var(--brand-primary-gray);
    border: 2px solid var(--brand-primary-dark);
    border-radius: 5px;
    transform: translate(10px, 36px);
    z-index: 999999;
`;

export const InputSuffix = styled.div`
    color: white;
`;

export const InputInvertedTriangle = styled.div<{ suffix?: string }>`
    width: 0;
    height: 0;
    margin-left: 5px;
    border-bottom: 8px solid transparent;
    border-top: 8px solid white;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    transform: translateY(5px);
    user-select: none;
    cursor: pointer;
`;
