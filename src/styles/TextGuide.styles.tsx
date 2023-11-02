import styled, { css } from "styled-components";

const baseTextStyle = css`
    font-family: "Noto Sans KR";
    font-style: normal;
`;

const sizes = {
    48: css`
        font-size: 48px;
        line-height: 60px;
    `,
    36: css`
        font-size: 36px;
        line-height: 46px;
    `,
    30: css`
        font-size: 30px;
        line-height: 38px;
    `,
    20: css`
        font-size: 20px;
        line-height: 28px;
    `,
    18: css`
        font-size: 18px;
        line-height: 26px;
    `,
    16: css`
        font-size: 16px;
        line-height: 23px;
    `,
    14: css`
        font-size: 14px;
        line-height: 20px;
    `,
    13: css`
        font-size: 13px;
        line-height: 19px;
    `,
    12: css`
        font-size: 12px;
        line-height: 18px;
    `,
    10: css`
        font-size: 10px;
        line-height: 16px;
    `,
};

interface TextComponentProps {
    size?: keyof typeof sizes;
    fontWeight?: number;
    color?: string;
}

const Text = styled.p<TextComponentProps>`
    ${baseTextStyle}
    ${({ size }) => size && sizes[size]}
    font-weight: ${({ fontWeight }) => fontWeight};
    color: ${({ color }) => color ?? "var(--brand-primary-darknavy)"};
`;
export const T = {
    Title1: styled(Text).attrs({ size: 30, fontWeight: 700 })``,
    Title2: styled(Text).attrs({ size: 36, fontWeight: 700 })``,
    Title3: styled(Text).attrs({ size: 48, fontWeight: 700 })``,
    Subtitle1: styled(Text).attrs({ size: 16, fontWeight: 700 })``,
    Subtitle2: styled(Text).attrs({ size: 16, fontWeight: 400 })``,
    Subtitle3: styled(Text).attrs({ size: 14, fontWeight: 400 })``,
    Body1: styled(Text).attrs({ size: 14, fontWeight: 700 })``,
    Body2: styled(Text).attrs({ size: 14, fontWeight: 400 })``,
    Body3: styled(Text).attrs({ size: 13, fontWeight: 700 })``,
    Body4: styled(Text).attrs({ size: 13, fontWeight: 400 })``,
    Menu1: styled(Text).attrs({ size: 10, fontWeight: 700 })``,
    Menu2: styled(Text).attrs({ size: 10, fontWeight: 400 })``,
};
