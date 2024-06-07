import { useState } from "react";
import { easeInOut, motion } from "framer-motion";

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
    const closeModal = () => setVisible(false);
    const openModal = () => setVisible(true);

    return (
        <div>
            {visible && (
                <motion.div
                    initial={{
                        opacity: 0, 
                    }}
                    animate={{
                        opacity: 1, 
                    }}
                    transition={{
                        duration: 0.2,
                        ease:"linear"
                    }}
                    className="absolute rigt-0 right-0 w-[80vh] origin-right bg-white/10 backdrop-blur inset-y-0 z-10 bg-black bg-opacity-10 flex items-center justify-center"
                >
                    <div className="bg-black h-[50vh] p-5 flex flex-col gap-4">
                        <div className="flex justify-between ">
                            <div className="text-xl text-white font-semibold">
                                {from}
                            </div>
                            <div className={`text-xl text-white font-semibold`}>
                                {important}
                            </div>
                        </div>
                        <div className="text-l text-white font-medium">
                            Subject: {subject}
                        </div>
                        <div className="text-l text-white font-medium h-[15vh]">
                            high emily we are please to say offer you a loan amount of 100K USD if you want to accept give a misscall on this number 960XXX23XX
                        </div>
                        <div className="text-l text-white font-medium flex flex-col">
                            <span>Best</span>
                            <span>Support</span>
                            <span>ScamCenter</span>
                        </div>
                        <button
                            className="text-white font-semibold bg-slate-800 w-[10vh] rounded"
                            onClick={(e) => {
                                e.stopPropagation();
                                closeModal();
                            }}
                        >
                            Close
                        </button>
                    </div>
                </motion.div>
            )}
            <motion.div className="flex flex-col cursor-pointer gap-2 border-2 bg-white rounded border-slate-200 mt-4 h-[15vh] p-2 hover:border-black hover:scale-105 "
                onClick={openModal}
                whileHover={{
                    scale: 1.05,
                    transition: {
                        duration:0.1
                    }
                }}
                initial={{
                    opacity: 0,
                    y: 20
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    ease: "easeIn",
                    duration: 0.3,
                }}
            >
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
            </motion.div>
        </div>
    );
}
