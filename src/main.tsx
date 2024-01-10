import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import VotingPage from "./pages/VotingPage";
import LogoutPage from "./pages/LogoutPage";
import AdminProtectedRoute from "./pages/AdminProtectedRoute";
import AdminLoginPage from "./pages/AdminLoginPage";
import ResultPage from "./pages/ResultPage";
import AdminPage from "./pages/AdminPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
                path="/gbm/vote/:uc"
                element={<ProtectedRoute comp={<VotingPage />} />}
            />
            <Route path="/logout" element={<LogoutPage />} />
            <Route
                path="/admin/result"
                element={
                    <div className="resulPageCon">
                        <AdminProtectedRoute comp={<ResultPage />} />
                    </div>
                }
            />
            <Route
                path="/admin/home"
                element={<AdminProtectedRoute comp={<AdminPage />} />}
            />
            <Route path="/admin/login" element={<AdminLoginPage />} />
        </Routes>
    </BrowserRouter>
);
