import { useEffect, useState } from "react";
import CandidateCard from "./CandidateCard";
import NameTag from "./NameTag";

interface Props {
    positionHeader: String;
    positionCode: Number;
    candidates: any;
    addVote: (p: any)=>void;
    deleteVote: (p: any)=>void;
}

export default function CandidatesPlate({
    positionHeader,
    candidates,
    addVote,
    deleteVote,
}: Props) {
    const [pref, setPref] = useState<{fullname: String}[]>([]);
    const [indicator, setIndicator] = useState("bg-warning");
    const [message, setMessage] = useState(
        "Choose your candidates in prefered order."
    );

    const singleCandidate = (candidates.length == 2)
    const candidateLimit = singleCandidate?2:3;

    useEffect(() => {
        if (pref.length >= candidateLimit) {
            setIndicator(() => {
                return "bg-success";
            });
            addVote(pref)
        } else {
            setIndicator(() => {
                return "bg-warning";
            });
        }
    }, [pref]);

    const onCardClick = (candidate: any) => {
        console.log(pref.length);
        if (pref.length >= candidateLimit) {
            setMessage(() => { return "To change prefrences, clear response ->"});
            return;
        }
        if(pref.find(e => e == candidate)) {
            setMessage(() => { return "You can't select a candidate multiple times!"});
            return;
        }
        setPref((pref) => { return [...pref, candidate]})
    };

    const clearResponse = () => {
        deleteVote(pref);
        setPref(() => {return []});
        setMessage(() => {return "Choose your candidates in prefered order."});
    };

    return (
        <div className="collapse collapse-arrow join-item border border-base-300 py-6">
            <input type="radio" name="my-accordion" />
            <div className="collapse-title text-lg font-medium flex">
                <div
                    className={"h-3 w-3 rounded-xl mr-4 mt-2 " + indicator}
                ></div>
                <div className="flex flex-col w-full">
                    {positionHeader}
                    <div className="flex w-full mt-3 items-center">
                        <NameTag
                            theme={pref[0] ? "bg-primary-content/50" : "bg-base-100"}
                            cName={pref[0] ? pref[0]?.fullname : "Not choosen"}
                            ind={1}
                        />
                        <NameTag
                            theme={pref[1] ? "bg-primary-content/50 mx-3" : "bg-base-100 mx-3"}
                            cName={pref[1] ? pref[1]?.fullname : "Not choosen"}
                            ind={2}
                        />
                        { singleCandidate?<></>:<NameTag
                            theme={pref[2] ? "bg-primary-content/50" : "bg-base-100"}
                            cName={pref[2] ? pref[2]?.fullname : "Not choosen"}
                            ind={3}
                        />}
                    </div>
                </div>
            </div>
            <div className="collapse-content">
                <div className="mb-5 mt-5 flex flex-wrap w-full">
                    {candidates.map((cand: any) => {
                        return (
                            <div onClick={() => onCardClick(cand)}>
                                <CandidateCard candidate={cand}/>
                            </div>
                        )
                    })}
                </div>
                <div className="alert bg-transparent border-none">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="stroke-info shrink-0 w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                    <span className="text-sm">{message}</span>
                    <div>
                        <button
                            className="btn btn-sm btn-warning"
                            onClick={clearResponse}
                        >
                            Clear response
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
