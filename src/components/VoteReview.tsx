export default function VoteReview({
    msg,
    submitState,
    submitVote,
    loader,
}: any) {
    const indicator = "bg-warning";

    return (
        <div className="collapse collapse-arrow join-item border border-base-300 py-6">
            <input type="radio" name="my-accordion" />
            <div className="collapse-title text-xl font-bold flex">
                <div
                    className={"h-3 w-3 rounded-xl mr-4 mt-2 " + indicator}
                ></div>
                <div className="flex flex-col w-full">{"Submit"}</div>
            </div>
            <div className="collapse-content">
                <div className="mb-5 mt-5 w-full justify-between items-center flex">
                    <p className="ml-6 font-medium text-gray-500">{msg}</p>
                    <button
                        className={"btn btn-sm btn-primary " + submitState}
                        onClick={submitVote}
                    >
                        <span
                            className={
                                "loading loading-spinner h-5 w-5 "+loader
                            }
                        ></span>
                        Confirm and submit
                    </button>
                </div>
            </div>
        </div>
    );
}
