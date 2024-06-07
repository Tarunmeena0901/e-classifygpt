export function EmailCard({
    from,
    subject,
    important,
}: {
    from: string;
    subject: string;
    important: string;
}) {
    return <div className="flex flex-col gap-2 border-2 bg-white rounded border-slate-200 mt-4 h-[15vh] p-2 ">
        <div className="flex justify-between ">
            <div className="font-spaceMono font-semibold">
                {from}
            </div>
            <div className={important === "Important" ? "font-semibold text-green-500":"font-semibold text-red-500" }>
                {important}
            </div>
        </div>
        <div className="flex items-center">
            {subject}
        </div>
    </div>;
}
