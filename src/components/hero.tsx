import { Link } from "react-router";
import { motion } from "framer-motion";

import image_home from "@/assets/images/image_home.png";

const Hero = () => {
    return (
        <motion.section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-12 px-5 py-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <motion.div className="flex flex-1 flex-col-reverse items-center justify-center gap-8 lg:flex-row lg:justify-between">
                <motion.div className="mt-8 flex w-full max-w-lg flex-col gap-4" initial={{ opacity: 0, y: 20, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}>
                    <motion.p className="text-font-primary text-4xl font-bold" initial={{ opacity: 0, y: 20, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.25 }}>
                        Kenali tumbuh-tumbuhan bermanfaat dari Indonesia, cukup lewat satu foto.
                    </motion.p>

                    <motion.p className="text-font-primary font-md text-xl" initial={{ opacity: 0, y: 20, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}>
                        Dengan teknologi AI, Daunesia membantumu mengidentifikasi berbagai tanaman herbal lokal Indonesia.
                    </motion.p>

                    <motion.div className="flex w-full max-w-sm flex-col gap-4 lg:flex-row" initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.55 }}>
                        <Link to={"/deteksi"} className="inline-flex items-center justify-center rounded-full px-8 py-3 text-center font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg" style={{ background: "linear-gradient(to right, #537D5D, #73946B)" }}>
                            Mulai Sekarang
                        </Link>
                    </motion.div>
                </motion.div>

                <motion.div className="mt-12" initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}>
                    <img src={image_home} className="w-full max-w-sm lg:max-w-md" draggable={false} alt="H illustration" />
                </motion.div>
            </motion.div>

            <motion.div className="border-green-primary mt-8 flex h-70 flex-col items-center justify-center gap-4 rounded-2xl border-[3px] border-dashed shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] transition-all duration-300 hover:shadow-md" initial={{ opacity: 0, y: 20, scale: 0.99 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }}>
                <motion.svg width="98" height="98" viewBox="0 0 98 98" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.2084 46.9583V14.2083C10.2084 11.9992 11.9992 10.2083 14.2084 10.2083H83.7917C86.0008 10.2083 87.7917 11.9992 87.7917 14.2083V83.7917C87.7917 86.0008 86.0008 87.7917 83.7917 87.7917H14.2084C11.9992 87.7917 10.2084 86.0008 10.2084 83.7917V63.2917" stroke="#537D5D" strokeWidth="4.5" strokeLinecap="round" />
                    <path d="M16.3334 53.0833L28.9305 40.4862C29.8129 39.6038 31.2788 39.736 31.9891 40.7619L47.7665 63.5506C48.4312 64.5106 49.7735 64.6995 50.6773 63.9601L70.0575 48.104C70.8528 47.4533 72.0117 47.5111 72.7382 48.2377L87.7917 63.2917" stroke="#537D5D" strokeWidth="4.5" strokeLinecap="round" />
                    <circle cx="67.375" cy="30.625" r="6.125" fill="#537D5D" stroke="#537D5D" strokeWidth="4.5" strokeLinecap="round" />
                </motion.svg>

                <motion.div className="inline-flex flex-col items-start justify-start" initial={{ opacity: 0, y: 20, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.6 }}>
                    <div className="flex flex-col items-center justify-start self-stretch">
                        <div className="text-green-secondary justify-center text-center leading-tight font-medium">Unggah gambar tanaman</div>
                    </div>
                    <div className="flex flex-col items-center justify-start self-stretch">
                        <div className="justify-center text-center">
                            <span className="text-green-secondary text-sm leading-none font-normal">Seret gambar ke sini atau</span>
                            <span className="text-green-secondary text-sm leading-none font-bold">
                                <a href="" className="transition-all duration-200">
                                    {" "}
                                    klik untuk unggah dari perangkat
                                </a>
                            </span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default Hero;
