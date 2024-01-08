import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SERVER } from "../constants/server";

export default function LogoutPage() {
    const navigate = useNavigate();

    const logout = () => {
        axios({
            method: "post",
            withCredentials: true,
            url: SERVER+"/gbm/logout",
        }).then((res) => {
            navigate("/login");
        }).catch((e) => {
            console.log(e)
        })
    };
    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <div className="flex flex-col rounded-2xl bg-success/20 p-8 items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-success/20 p-3">
                    <img src="./src/assets/vote.svg" />
                </div>
                <p className="font-semibold text-lg mt-3">Vote submitted</p>
                <p className="font-semibold text-sm mt-1 text-base-content">
                    Thank you, your vote matters a lot!
                </p>
                <button onClick={logout} className="btn btn-success btn-primary mt-5 w-72 font-semibold text-white text-md">
                    Logout
                </button>
            </div>
        </div>
    );
}
