export default function NameTag({theme, cName, ind}) {
    return (
        <button className={"btn rounded-full btn-sm px-2 pr-4 "+theme}>
            <div className="flex text-center justify-center items-center w-5 h-5 rounded-full text-xs bg-base-100">
                {ind}
            </div>
            {cName}
        </button>
    );
}
