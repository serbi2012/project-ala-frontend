import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main/Main";
import Editor from "../pages/Editor/Editor";

const Router = () => {
    return (
        <Routes>
            <Route path={"/"} element={<Main />} />
            <Route path={"/editor"} element={<Editor />} />
        </Routes>
    );
};

export default Router;
