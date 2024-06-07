"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function UserCard({ session }: { session: any }) {
    const router = useRouter();
    return (
        <div className="border-2 border-slate-400 h-[25vh] p-2 flex rounded-full bg-black">
            <div className="w-[10vh] flex justify-center items-center">
                <img
                    className="object-cover w-[8vh] h-[8vh] bg-clip rounded-full border-2 border-slate-500"
                    src={session.user?.image || ""}
                />
            </div>
            <div className="flex justify-between items-center mt-2 w-[90vh]">
                <div className="flex flex-col gap-1">
                    <div className="font-spaceMono text-white font-semibold">
                        Welcome, {session.user?.name}
                        </div>
                    <div className="font-spaceMono text-white">{session.user?.email}</div>
                </div>
                <div>
                    <button
                        className="bg-gradient-to-r mr-3 border-2 border-slate-500 from-slate-500 to-slate-800 text-white h-[5vh] w-[20vh] rounded-full hover:border-black hover:scale-105 transition ease-in-out"
                        onClick={() => signOut().then(() => router.push("/"))}
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
}
