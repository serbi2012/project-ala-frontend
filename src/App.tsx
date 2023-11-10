import { useEffect } from "react";
import Router from "./routes/Router";
import { useLocation } from "react-router-dom";

const App = () => {
    const location = useLocation();

    useEffect(() => {
        if (location?.pathname === "/editor") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [location]);

    return (
        <>
            <Router />
        </>
    );
};

export default App;
