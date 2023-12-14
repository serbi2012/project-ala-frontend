import { Button, Modal } from "@mui/material";
import * as S from "./index.styles";
import { T } from "../../../../styles/textGuides.styles";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { pageSizeState } from "../../../../recoil/atoms/pageOptionState copy";

const PAGE_SIZE_ITEMS = [
    { width: 2480, height: 3508, ratio: "0.7", name: "A4", size: "210mm x 297mm" },
    { width: 1920, height: 1080, ratio: "1.77", name: "Web (FHD)", size: "1920px x 1080px" },
    { width: 1280, height: 720, ratio: "1.77", name: "Web (HD)", size: "1280px x 720px" },
    { width: 854, height: 480, ratio: "1.77", name: "Web (SD)", size: "854px x 480px" },
];

const MainStartBox: React.FC = () => {
    const [, setPageSize] = useRecoilState(pageSizeState);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPage, setSelectedPage] = useState("");

    return (
        <S.MainWrapper>
            <T.Title1>작업 목록</T.Title1>
            <Button variant="contained" size="large" startIcon={<AddBoxIcon />} onClick={() => setIsModalOpen(true)}>
                신규작업
            </Button>
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <S.ModalWrapper>
                    <T.Title1>Select Page Size</T.Title1>
                    <S.HorizonLine />
                    <S.PageExampleContainer>
                        {PAGE_SIZE_ITEMS?.map((item, index) => (
                            <S.PageBox
                                onClick={() => {
                                    setPageSize({ width: item.width, height: item.height });
                                    setSelectedPage(item.name);
                                }}
                                key={index}
                                isSelected={item.name === selectedPage}
                            >
                                <S.PageExample ratio={item?.ratio} />
                                <T.Body1>{item.name}</T.Body1>
                                <T.Menu2>{item.size}</T.Menu2>
                            </S.PageBox>
                        ))}
                    </S.PageExampleContainer>
                    <S.HorizonLine />
                    <Link to="/editor">
                        <Button variant="contained" size="large" startIcon={<AddBoxIcon />}>
                            선택
                        </Button>
                    </Link>
                </S.ModalWrapper>
            </Modal>
        </S.MainWrapper>
    );
};

export default MainStartBox;
