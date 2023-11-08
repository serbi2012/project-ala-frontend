import * as S from "./Editor.styles";
import EditorHeader from "./components/EditorHeader/EditorHeader.component";
import EditorHeaderToolbar from "./components/EditorHeaderToolbar/EditorHeaderToolbar.component";
import EditorSideToolbar from "./components/EditorSideToolbar/EditorSideToolbar.component";

const Editor: React.FC = () => {
    return (
        <S.MainWrapper>
            <EditorHeader />
            <EditorHeaderToolbar />
            <S.DrawingContainer>
                <EditorSideToolbar />
            </S.DrawingContainer>
        </S.MainWrapper>
    );
};

export default Editor;
