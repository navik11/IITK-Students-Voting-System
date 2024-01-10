import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER } from "../constants/server";

export default function AdminPage() {
    const navigate = useNavigate();

    const [avatarName, setAvatarName] = useState("Avatar");
    const [loadingBar, setLoadingBar] = useState("hidden");

    const getFile = (id: any) => {
        document.getElementById(id)?.click();
    };

    const getFileName = (obj: any) => {
        let filename = obj.target.value.split("\\");
        return filename[filename.length - 1];
    };

    const addCandidate = (e: any) => {
        e.preventDefault();

        setLoadingBar(() => {
            return "";
        });
        const formData = new FormData(e.target);

        axios({
            method: "post",
            url: SERVER + "/admin/addCandidate",
            data: formData,
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((res) => {
                setLoadingBar(() => {
                    return "hidden";
                });
                window.alert("Candidate added!");
                console.log("User added", res);
            })
            .catch((error) => {
                setLoadingBar(() => {
                    return "hidden";
                });
                window.alert("Failed to add candidate, plz see error log");
                console.error(error);
            });
    };

    return (
        <>
            <div className="addCandidateContainre flex flex-col p-12">
                Add candidates
                <form className="flex mt-5 flex-wrap" onSubmit={addCandidate}>
                    <input
                        name="positioncode"
                        type="number"
                        className="input input-bordered input-sm m-2"
                        placeholder="Position Code"
                        required
                    ></input>
                    <input
                        name="fullname"
                        type="text"
                        className="input input-bordered input-sm m-2"
                        placeholder="Full name"
                        required
                    ></input>
                    <input
                        name="rollno"
                        type="number"
                        className="input input-bordered input-sm m-2"
                        placeholder="Roll number"
                        required
                    ></input>
                    <input
                        name="email"
                        type="email"
                        className="input input-bordered input-sm m-2"
                        placeholder="email@iitk.ac.in"
                        required
                    ></input>
                    <input
                        name="hashTag"
                        type="text"
                        className="input input-bordered input-sm m-2"
                        placeholder="#hashTag (without #)"
                        required
                    ></input>
                    <input
                        id="avIn"
                        name="avatar"
                        type="file"
                        className="input input-bordered m-2 hidden"
                        onChange={(obj) => {
                            setAvatarName(() => getFileName(obj));
                        }}
                    ></input>
                    <label
                        className="input input-bordered m-2 items-center flex input-sm"
                        onClick={() => getFile("avIn")}
                    >
                        {avatarName}
                    </label>
                    <input
                        name="submit"
                        type="submit"
                        value={"Add"}
                        className="input input-primary input-sm m-2"
                    ></input>
                    <span className={"loading " + loadingBar}></span>
                </form>
                <button
                    className="btn btn-sm mt-[300px] max-w-32"
                    onClick={() => {
                        navigate("/admin/result");
                    }}
                >
                    Show results
                </button>
            </div>
        </>
    );
}
