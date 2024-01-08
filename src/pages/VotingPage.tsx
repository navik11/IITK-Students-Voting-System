import { useEffect, useState } from "react";
import CandidatesPlate from "../components/CandidatesPlate";
import axios from "axios";
import VoteReview from "../components/VoteReview";
import { useNavigate, useParams } from "react-router-dom";
import { readErrorMessage } from "../utils/ErrorMessageReader";
import { SERVER } from "../constants/server";
import {
    positionNameByCode,
    positionToVoteFor,
} from "../constants/positionData.js";

export default function VotingPage() {
    const [candidatesData, setCandidateData] = useState<{[x: string] : []}>({});
    const [vote, setVote] = useState<{[x:string]:{rollno:number}[]}>({ pref1: [], pref2: [], pref3: [] });

    const { uc } = useParams();
    const totalPositions = String(positionToVoteFor[uc ? uc : "y22btbs"]).split(
        ","
    ).length;
    const [readyPositions, setReadyPositions] = useState(0);

    const [submitState, setSubmitState] = useState("btn-disabled");
    const [fmsg, setfMsg] = useState(
        "Please review, your selection is incomplete"
    );

    const [loader, setLoader] = useState("hidden");

    const navigate = useNavigate();

    useEffect(() => {
        axios({
            method: "get",
            url:
                SERVER +
                "/candidate/getCandidates?positions=" +
                positionToVoteFor[String(uc)],
            withCredentials: true,
        })
            .then((res: any) => {
                const data = res.data?.data?.allCandidates;
                setCandidateData(() => {return data});
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (readyPositions == totalPositions) {
            setSubmitState(() => {
                return "";
            });
            setfMsg(() => {
                return "Please review and confirm before submitting your vote!";
            });
        } else {
            setSubmitState(() => {
                return "btn-disabled";
            });
            setfMsg(() => {
                return "Please review, your selection is incomplete";
            });
        }
    }, [readyPositions]);

    const updateReadyPositions = (c: String) => {
        if (c == "+")
            setReadyPositions((rp) => {
                return rp + 1;
            });
        else
            setReadyPositions((rp) => {
                return rp - 1;
            });
    };

    const addVote = (prefs: any) => {
        setVote((vote) => {
            let temp = vote;
            temp["pref1"].push(prefs[0]?.rollno);
            temp["pref2"].push(prefs[1]?.rollno);
            temp["pref3"].push(prefs[2] ? prefs[2].rollno : 0);
            return temp;
        });
        updateReadyPositions("+");
    };

    const deleteVote = (prefs: any) => {
        setVote((vote) => {
            let temp = vote;
            temp["pref1"] = temp["pref1"].filter((e) => e !== prefs[0]?.rollno);
            // temp['pref1'] = temp['pref1'].filter(e => e !== 0)
            temp["pref2"] = temp["pref2"].filter((e) => e !== prefs[1]?.rollno);
            // temp['pref2'] = temp['pref2'].filter(e => e !== 0)
            const p3rn = prefs[2] ? prefs[2].rollno : 0;
            temp["pref3"] = temp["pref3"].filter((e) => e !== p3rn);
            // temp['pref3'] = temp['pref3'].filter(e => e !== 0)
            return temp;
        });
        updateReadyPositions("-");
    };

    const submitVote = () => {
        setLoader(() => {
            return "";
        });
        console.log(vote)
        axios({
            method: "post",
            url: SERVER + "/gbm/submitVote",
            withCredentials: true,
            data: vote,
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(() => {
                setLoader(() => {
                    return "hidden";
                });
                navigate("/logout");
            })
            .catch((error: any) => {
                setfMsg(() => {
                    return readErrorMessage(error);
                });
                setLoader(() => {
                    return "hidden";
                });
                console.log(error);
            });
    };

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <div className="flex flex-col justify-center items-center w-full max-w-4xl">
                <div className="prose max-w-full mt-20">
                    <div className="flex justify-between items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="stroke-info shrink-0 w-10 h-10"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                        <p className="bg-blue-100 text-blue-500 text-sm rounded-full prose py-2 px-4">
                            Must read
                        </p>
                    </div>
                    <p className="py-0 mt-3 mb-2">General Elections 2024</p>
                    <h1>Voting Instructions</h1>

                    <p>
                        Your vote is confidential and completely anonymous.
                        Follow these guidelines to cast your vote:
                    </p>

                    <ol>
                        <li>
                            Select up to 3 candidates in order of preference for
                            each post.
                        </li>
                        <li>
                            If only one candidate is nominated for a post,
                            select the prefrence order with respect to NOTA.
                        </li>
                        <li>
                            Assign points to your preferences as follows:
                            <ul>
                                <li>1st preference: 3x points</li>
                                <li>2nd preference: 2x points</li>
                                <li>3rd preference: 1x points</li>
                            </ul>
                        </li>
                        <li>
                            Symbolism:
                            <ul>
                                <li className="flex items-center">
                                    <div
                                        className={
                                            "h-3 w-3 rounded-xl bg-warning mr-3"
                                        }
                                    ></div>
                                    Incomplete selection
                                </li>
                                <li className="flex items-center">
                                    <div
                                        className={
                                            "h-3 w-3 rounded-xl bg-success mr-3"
                                        }
                                    ></div>
                                    Completed selection
                                </li>
                            </ul>
                        </li>
                        <li>
                            On completion of candidate selection, Submit button will be activated. And you can submit your vote. 
                        </li>
                        <li>
                            You should review your choices before submitting to
                            ensure accuracy.
                        </li>
                    </ol>

                    <p>If you have any questions or concerns, feel free to seek assistance from the election officers.</p>
                    <p>Thank you for participating in the voting process!</p>
                </div>
                <div className="flex justify-between items-center w-full mt-32">
                    <div>
                        <p className="text-3xl font-semibold">
                            Choose your candidate
                        </p>
                        <p className="text-md mt-2">
                            Your vote is your voice, use it wisely.
                        </p>
                    </div>
                    <img
                        src="../../src/assets/iitk_logo.svg"
                        className="size-16 scale-150"
                    />
                </div>
                <div className="join join-vertical w-full mt-14 mb-20">
                    {Object.keys(candidatesData).map((k: any) => {
                        return (
                            <CandidatesPlate
                                key={k}
                                positionCode={k}
                                positionHeader={positionNameByCode[k]}
                                candidates={candidatesData[k]}
                                addVote={addVote}
                                deleteVote={deleteVote}
                            />
                        );
                    })}
                    <VoteReview
                        msg={fmsg}
                        submitState={submitState}
                        submitVote={submitVote}
                        loader={loader}
                    />
                </div>
            </div>
        </div>
    );
}
