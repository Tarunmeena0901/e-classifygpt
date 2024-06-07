import { useState } from "react";

export function EmailCard({
    from,
    subject,
    important,
}: {
    from: string;
    subject: string;
    important: string;
}) {
    const [visible, setVisible] = useState<boolean>(false);
    return <div className="flex flex-col gap-2 border-2 bg-white rounded border-slate-200 mt-4 h-[15vh] p-2 hover:border-black hover:scale-105 transition ease-in-out"
        onClick={() => setVisible(true)}>
        {visible && (
            <div className="absolute z-10 backdrop-blur right-0 inset-y-0 h-screen w-[50vh] flex items-center justify-center  ">
                <div className="bg-black h-[50vh] p-5 flex flex-col gap-4">
                <div className="flex justify-between ">
                <div className=" text-xl text-white font-semibold ">
                    {from}
                </div>
                <div className=" text-xl text-white font-semibold text-green-500">
                    {important}
                </div>
                </div>
                <div className=" text-l text-white font-medium ">
                    Subject: {subject}
                </div>
                <div className=" text-l text-white font-medium h-[15vh] ">
                   high emily we are please to say offer you  a loan amount of 100K USD if you want to accept give a misscall on this number 960XXX23XX
                </div>
                <div className=" text-l text-white font-medium flex flex-col ">
                    <span>Best</span>
                    <span>Support</span>
                    <span>ScamCenter</span>
                </div>
                <button
                    className="text-white font-semibold bg-slate-800 w-[10vh] rounded"
                    onClick={(e) => {
                        e.stopPropagation();
                        setVisible(false);
                    }}
                >
                    Close
                </button>
                </div>
            </div>
        )}
        <div className="flex justify-between ">
            <div className="font-spaceMono font-semibold">
                {from}
            </div>
            <div className={important === "Important" ? "font-semibold text-green-500" : "font-semibold text-red-500"}>
                {important}
            </div>
        </div>
        <div className="flex items-center">
            {subject}
        </div>
    </div>;
}
