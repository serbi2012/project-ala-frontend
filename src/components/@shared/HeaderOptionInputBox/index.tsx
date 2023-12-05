import { useRecoilState } from "recoil";
import { selectedToolOptionState } from "../../../recoil/atoms/selectedToolState";
import * as S from "./index.styles";
import { InputAdornment, Slider } from "@mui/material";
import { useState } from "react";

export interface IHeaderOptionInputBoxProps {
    option: string;
    type?: string;
    width?: number;
    suffix?: string;
    prefix?: string;
    isArrow?: boolean;
    isSlider?: boolean;
}

const HeaderOptionInputBox = ({
    option,
    type = "number",
    width = 100,
    suffix,
    prefix,
    isArrow = false,
}: IHeaderOptionInputBoxProps) => {
    const [selectedToolOption, setSelectedToolOption] = useRecoilState<any>(selectedToolOptionState);

    const [isSliderOpen, setIsSliderOpen] = useState<boolean>(false);

    return (
        <S.OptionInputBox width={width} suffix={suffix} type={type} isArrow={isArrow}>
            <S.InputField
                width={width}
                suffix={suffix}
                prefix={prefix}
                value={selectedToolOption?.[`${option}`]}
                onChange={(e) =>
                    setSelectedToolOption((prev: any) => {
                        return { ...prev, [option]: e.target.value };
                    })
                }
                type={type}
                InputProps={{
                    ...(prefix && {
                        startAdornment: (
                            <InputAdornment position="start">
                                <S.InputPrefix>{prefix}</S.InputPrefix>
                            </InputAdornment>
                        ),
                    }),
                    ...(suffix && {
                        endAdornment: (
                            <InputAdornment
                                position="end"
                                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                            >
                                <S.InputSuffix>{suffix}</S.InputSuffix>
                                {isArrow && (
                                    <S.InputInvertedTriangle
                                        onClick={() => {
                                            setIsSliderOpen((prev) => !prev);
                                        }}
                                    />
                                )}
                            </InputAdornment>
                        ),
                    }),
                }}
            />
            {isArrow && isSliderOpen && (
                <S.SliderWrapper style={{ width: `${(width || 100) - 10}px` }}>
                    <Slider
                        value={selectedToolOption?.[`${option}`]}
                        defaultValue={selectedToolOption?.[`${option}`]}
                        min={1}
                        max={200}
                        onChange={(e: any) =>
                            setSelectedToolOption((prev: any) => {
                                if (e?.target) {
                                    return { ...prev, [option]: e.target.value };
                                }
                            })
                        }
                        size="small"
                        color="secondary"
                    />
                </S.SliderWrapper>
            )}
        </S.OptionInputBox>
    );
};

export default HeaderOptionInputBox;
