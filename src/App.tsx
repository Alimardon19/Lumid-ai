import AOS from 'aos';
import {useEffect} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import AuthPage from "./view/auth";
import Navigation from "./components/navigation";
import CheckDocuments from "./view/start-agent/check-documents";
import StepCompanyInfo from "./view/start-agent/company-info/index.jsx.tsx";

import 'aos/dist/aos.css'; // You can also use <link> for styles
// remix icons
import 'remixicon/fonts/remixicon.css';
import Integration from "./view/start-agent/integration";


function App() {
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigation/>}/>
                    <Route path="/step/company-info" element={<StepCompanyInfo/>}/>
                    <Route path="/check-documents" element={<CheckDocuments/>}/>
                    <Route path="/integration" element={<Integration/>}/>
                    <Route path="/login" element={<AuthPage/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
