import axios from "axios";
import { SERVER } from "../constants/server";
import { useState } from "react";
import ResultTable from "../components/ResultTable";
import { positionNameByCode } from "../constants/positionData";

export default function ResultPage() {
    const [result, setResult] = useState<{ [x: string]: [] }>({});

    const countVotes = () => {
        axios({
            method: "get",
            url: SERVER + "/admin/countVotes",
            withCredentials: true,
        })
            .then((res) => {
                console.log(res);
                setResult(() => {
                    return res.data.data.results;
                });
            })
            .catch((err: any) => {
                console.log(err);
            });
    };

    return (
        <div className="p-12">
            <div className="flex justify-between items-center w-full">
                <div>
                    <span className="text-3xl font-semibold">
                        Results, General Election 2024
                    </span>
                </div>
                <img
                    src="/assets/iitk_logo.svg"
                    className="size-16 scale-150"
                />
            </div>
            <div className=""></div>
            <div className="btn btn-xs rounded-full px-3" onClick={countVotes}>
                Count Votes
            </div>
            {Object.keys(result).map((k: any) => {
                return Array.isArray(result[k]) ? (
                    <ResultTable
                        key={k}
                        positionName={positionNameByCode[k]}
                        data={result[k]}
                    />
                ) : (
                    <></>
                );
            })}
        </div>
    );
}
