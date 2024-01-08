export default function CandidateCard({candidate} : any) {
    console.log(candidate)
    return (
        <div className="w-[275px] px-4 py-4 rounded-2xl hover:bg-black/5 mx-1">
            <div className="w-full h-36 rounded-2xl bg-gradient-to-tr from-gray-300 to-gray-200 flex items-center justify-center">
                <img
                    src={candidate.avatar == 'notaLogo'? "../../../src/assets/notaLogo.svg":String(candidate.avatar).replace("upload/", "upload/ar_1:1,c_crop,g_face/")}
                    alt="Shoes"
                    className="rounded-full w-24 h-24"
                />
            </div>
            <div className="flex flex-col text-center w-full">
                <h2 className="text-md font-semibold mt-3">{candidate?.fullname}</h2>
                <p className="text-sm font-medium mt-1">{"#"+candidate?.hashTag}</p>
            </div>
        </div>
    )
}
