import * as S from "./Editor.styles";
import EditorHeader from "./components/EditorHeader/EditorHeader.component";

const Editor: React.FC = () => {
    return (
        <S.MainWrapper>
            <EditorHeader />
        </S.MainWrapper>
    );
};

export default Editor;
