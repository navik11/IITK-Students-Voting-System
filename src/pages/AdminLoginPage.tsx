import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { readErrorMessage } from "../utils/ErrorMessageReader";
import { SERVER } from "../constants/server";
function AdminLoginPage() {
    const [loaderClass, setLoaderClass] = useState("hidden");
    const [loginState, setLoginState] = useState("");

    const [message, setMessage] = useState(
        "Please use your CC Id and password"
    );

    const startLoading = () => {
        setLoaderClass(() => "");
        setLoginState(() => "hidden");
    };
    const stopLoading = () => {
        setLoaderClass(() => "hidden");
        setLoginState(() => "");
    };

    const navigate = useNavigate();

    const login = (e: any) => {
        e.preventDefault();
        startLoading();

        const formData = new FormData(e.target);

        console.log(SERVER);

        axios({
            method: "post",
            url: SERVER + "/admin/ccLogin",
            data: formData,
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(() => {
                stopLoading();
                navigate("/admin/home");
            })
            .catch((error: any) => {
                stopLoading();
                console.log(error);
                setMessage(() => {
                    return readErrorMessage(error);
                });
            });
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen">
            <div className="flex flex-col items-center justify-center">
                <img
                    src="/assets/iitk_logo.svg"
                    className="size-32 scale-150"
                />
                <h1 className="text-3xl mt-6 font-bold">
                    Admin: General Elections{" "}
                    <span className="text-primary text-2xl">2024</span>
                </h1>
            </div>
            <form className="flex flex-col mt-6 w-[350px]" onSubmit={login}>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-textw w-full text-center">
                            {message}
                        </span>
                    </div>
                    <input
                        name="email"
                        placeholder="usernameXX@iitk.ac.in"
                        type="text"
                        required
                        className="input input-bordered w-full mt-4"
                    />
                </label>
                <input
                    name="password"
                    placeholder="CC Password"
                    type="text"
                    required
                    className="input input-bordered input-md w-full mt-2"
                />
                <input
                    type="submit"
                    value={"Login"}
                    className={
                        "btn mt-8 mb-12 w-full btn-primary" + " " + loginState
                    }
                />
                <button
                    className={"btn-primary btn mt-8 mb-12" + " " + loaderClass}
                >
                    <span className="loading loading-spinner"></span>
                    Login
                </button>
                <p className="w-full text-center text-sm text-gray-700 mb-10">
                    © Election commission IIT Kanpur- 2024
                </p>
            </form>
        </div>
    );
}

export default AdminLoginPage;
