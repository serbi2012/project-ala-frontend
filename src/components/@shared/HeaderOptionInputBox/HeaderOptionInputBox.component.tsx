import { useRecoilState } from "recoil";
import { selectedToolOptionState } from "../../../recoil/atoms/selectedToolState";
import * as S from "./HeaderOptionInputBox.styles";
import { IHeaderOptionInputBoxProps } from "./HeaderOptionInputBox.types";

const HeaderOptionInputBox = ({ option, type = "number", width = 100 }: IHeaderOptionInputBoxProps) => {
    const [selectedToolOption, setSelectedToolOption] = useRecoilState<any>(selectedToolOptionState);

    return (
        <S.OptionInputBox width={width}>
            <input
                type={type}
                value={selectedToolOption?.[`${option}`]}
                onChange={(e) =>
                    setSelectedToolOption((prev: any) => {
                        return { ...prev, [option]: e.target.value };
                    })
                }
            />
            {type === "number" && <S.InputSuffix>px</S.InputSuffix>}
            <S.InputInvertedTriangle />
        </S.OptionInputBox>
    );
};

export default HeaderOptionInputBox;
