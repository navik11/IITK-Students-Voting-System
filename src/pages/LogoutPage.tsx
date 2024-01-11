import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SERVER } from "../constants/server";
import { useState } from "react";

export default function LogoutPage() {
    const navigate = useNavigate();

    const [loaderState, setLoaderState] = useState("hidden");
    const [logoutState, setLogoutState] = useState("");

    const logout = () => {
        setLogoutState(() => {
            return "hidden";
        });
        setLoaderState(() => {
            return "";
        });
        axios({
            method: "post",
            withCredentials: true,
            url: SERVER + "/gbm/logout",
        })
            .then(() => {
                setLogoutState(() => {
                    return "";
                });
                setLoaderState(() => {
                    return "hidden";
                });
                navigate("/login");
            })
            .catch((e) => {
                console.log(e);
                setLogoutState(() => {
                    return "";
                });
                setLoaderState(() => {
                    return "hidden";
                });
            });
    };
    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <div className="flex flex-col rounded-2xl bg-success/20 p-8 items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-success/20 p-3">
                    <img src="/assets/vote.svg" />
                </div>
                <p className="font-semibold text-lg mt-3">Vote submitted</p>
                <p className="font-semibold text-sm mt-1 text-base-content">
                    Thank you, your vote matters a lot!
                </p>
                <button
                    onClick={logout}
                    className={
                        "btn btn-success btn-primary mt-5 w-72 font-semibold text-white text-md " +
                        logoutState
                    }
                >
                    Logout
                </button>
                <button
                    className={
                        "btn btn-success btn-primary mt-5 w-72 font-semibold text-white text-md " +
                        loaderState
                    }
                >
                    <span className="loading loading-spinner"></span>
                    Logout
                </button>
            </div>
        </div>
    );
}
