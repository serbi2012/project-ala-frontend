import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main/Main.component";
import Editor from "../pages/Editor/Editor.component";

const Router = () => {
    return (
        <Routes>
            <Route path={"/"} element={<Main />} />
            <Route path={"/editor"} element={<Editor />} />
        </Routes>
    );
};

export default Router;
