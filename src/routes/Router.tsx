import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main/Main.component";

const Router = () => {
    return (
        <Routes>
            <Route path={"/"} element={<Main />} />
        </Routes>
    );
};

export default Router;
