"use client";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [userKey, setUserKey] = useState<string | "">("")
  const router = useRouter();

  //storing the api key from the user in the local storage
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('OPENAI_KEY', userKey);
    }
    alert('API Key saved!');
  };

  const divs = Array.from({ length: 72 }, (_, i) => (
    <div
      key={i}
      className={`h-[15vh] ${i % 12 < 9 ? "col-span-1" : "col-span-3"
        } border-2 border-slate-100 -z-1`}
    >
      {" "}
    </div>
  ));

  return (
    <div className="overflow-hidden h-screen">
      <div className="grid grid-cols-12  w-full h-full">
        {divs}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="flex flex-col items-center justify-center  bg-slate-100 w-[70vh] rounded p-5  ">
            <div className="font-spaceMono text-6xl font-bold text-transparent bg-gradient-to-r from-slate-500 to-slate-800 bg-clip-text">
              ClassifyGPT
            </div>
            <div className="flex">
              <div className="font-spaceMono text-l font-semibold text-transparent bg-gradient-to-r from-slate-500 to-slate-800 bg-clip-text">
                powered by GPT-4o
              </div>
              <div>🚀</div>
            </div>
            {session ? (
              <div className="flex flex-col justify-center items-center mt-5">
                <div className="font-semibold">
                  Welcome, {session?.user?.name}
                </div>
                <div className="flex gap-2 mt-2">
                <input type="text" placeholder="Enter Your OpenAi API Key"
                  onChange={(e) => setUserKey(e.target.value)}
                  className="w-[30vh] h-[5vh] border-slate-300 border-2 rounded text-center" />
                <button className="w-[5vh] h-[5vh] bg-slate-200 rounded" onClick={handleSubmit}>➕</button>
                </div>
                <div className="mt-6 flex justify-center items-center gap-4 ">
                  <button
                    className="bg-gradient-to-r from-slate-500 to-slate-800 text-white h-[5vh] w-[20vh] rounded hover:border-black hover:scale-105 transition ease-in-out"
                    onClick={() => router.push("/home")}
                  >
                    Go to home
                  </button>
                  <button
                    className="bg-gradient-to-r from-slate-500 to-slate-800 text-white h-[5vh] w-[20vh] rounded hover:border-black hover:scale-105 transition ease-in-out"
                    onClick={() => signOut().then(() => localStorage.removeItem("OPENAI_KEY"))}
                  >
                    Log Out
                  </button>
                </div>
                <div className="absolute flex flex-wrap p-4 bg-white bottom-40 font-semibold font-spaceMono text-center text-l z-10">
                  🟢 If you  dont have OpenAi api key you are free to use mine. Have fun 💖
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center mt-5">
                <div className="font-semibold">
                  Welcome, please login with your google account
                </div>
                <button
                  className="bg-gradient-to-r from-slate-500 to-slate-800 text-white mt-2 h-[5vh] w-[20vh] rounded"
                  onClick={() => signIn("google")}
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
