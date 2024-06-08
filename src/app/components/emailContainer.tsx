import { EmailCard } from "./emailCard";
import { CATEGORIZED_EMAILS, EMAIL } from "../type";
import {Spinner} from "@nextui-org/spinner";
import { SkeletonLoader } from "./skeletonLoader";

export function EmailContainer({
    categorizedEmails,
    filteredEmails,
    loading
}:
    {
        categorizedEmails: CATEGORIZED_EMAILS | undefined,
        filteredEmails: EMAIL[],
        loading: boolean
    }) {
    return (
        <div>
            <div className="text-xl font-semibold top-0 sticky bg-white p-2 border-slate-100 border-y-2 rounded">Your Emails🔻</div>
        <div className="px-10 py-2 border-2 border-slate-100 bg-gradient-to-r from-slate-500 rounded overflow-y-scroll h-[70vh] w-[90vh]">
            
            {loading ? <SkeletonLoader/> : <ul>
                {categorizedEmails ? categorizedEmails.map((email, id) => (
                    <EmailCard key={id} from={email.from} subject={email.subject} classification={email.classification} body={email.body} />
                )) :
                    filteredEmails.map((email, id) => (
                        <EmailCard key={id} from={email.from} subject={email.subject} classification={""} body={email.body} />
                    ))}
            </ul>}
        </div>
        </div>
    )
}