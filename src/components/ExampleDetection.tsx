import sirih from "@/assets/images/sirih.png";
import { motion } from "framer-motion";

const ContohDeteksi = () => {
    return (
        <section className="flex flex-col items-center gap-6 py-18">
            <div className="flex w-full max-w-7xl flex-col items-center gap-6 px-5">
                <div className="bg-green-second-light text-green-primary relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-2">
                    <motion.div
                        className="absolute h-24 w-24 rounded-full bg-gradient-to-r from-green-700 to-transparent"
                        style={{
                            offsetPath: "rect(0px auto auto 0px round 9999px)",
                            offsetDistance: "0%",
                            offsetRotate: "0deg",
                        }}
                        animate={{ offsetDistance: ["0%", "100%"], rotate: [360, 0] }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                    <div className="bg-green-second-light text-green-primary absolute inset-0.5 rounded-full" />
                    <p className="relative text-lg">Contoh Hasil Deteksi</p>
                </div>

                <div className="flex flex-col gap-1 text-center">
                    <div className="text-font-primary text-3xl font-bold">Kenali Tanaman Herbal Populer</div>
                    <p className="text-font-primary text-lg font-normal">Beberapa contoh daun yang bisa kamu identifikasi langsung dengan Daunesia.</p>
                </div>

                <div className="mt-8 flex w-full flex-row justify-start gap-12">
                    <div className="relative aspect-square w-full max-w-xs">
                        <img src={sirih} alt="" className="object-cover" />
                        <div className="absolute inset-4">
                            <svg width="auto" className="object-cover" height="auto" viewBox="0 0 324 324" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M322 82V12C322 6.47715 317.523 2 312 2H242M322 242V312C322 317.523 317.523 322 312 322H242M82 2H12C6.47715 2 2 6.47715 2 12V82M2 242V312C2 317.523 6.47715 322 12 322H82" stroke="white" stroke-width="4" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="h-20 w-full border bg-fuchsia-50"></div>
                    </div>
                    {/* <img src={HasilDeteksi} alt="" className="h-115" /> */}
                </div>
            </div>
        </section>
    );
};

export default ContohDeteksi;
