interface props {
    positionName: String;
    data: Array<{
        rollno: number;
        pref1VoteCount: number;
        pref2VoteCount: number;
        pref3VoteCount: number;
        totalVoteCount: number;
        fullname: String;
    }>;
}

export default function ResultTable({ positionName, data }: props) {
    console.log(data);
    return (
        <>
            <div className="text-sm mt-10 ml-4 font-medium">{positionName}</div>
            <table className="table w-full mt-5">
                <thead>
                    <tr>
                        <th>Roll No.</th>
                        <th>Full name</th>
                        <th>{"Vote Counts ->"}</th>
                        <th>1st Prefrence</th>
                        <th>2nd Prefrence</th>
                        <th>3rd Prefrence</th>
                        <th>Total weighted votes</th>
                    </tr>
                </thead>
                {data.map((cnd) => {
                    return (
                        <tbody>
                            <tr>
                                <td>
                                    {String(
                                        cnd.rollno < 999 ? "-" : cnd.rollno
                                    )}
                                </td>
                                <td>{cnd.fullname}</td>
                                <td>{}</td>
                                <td>{cnd.pref1VoteCount}</td>
                                <td>{cnd.pref2VoteCount}</td>
                                <td>{cnd.pref3VoteCount}</td>
                                <td>{cnd.totalVoteCount}</td>
                            </tr>
                        </tbody>
                    );
                })}
            </table>
            {}
        </>
    );
}
