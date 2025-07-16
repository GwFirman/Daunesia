import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepsImg from "@/assets/images/steps.png";

const steps = [
    {
        title: "Unggah foto tanaman",
        content: "Ambil atau pilih foto tanaman yang ingin kamu identifikasi melalui aplikasi Daunesia.",
    },
    {
        title: "Biarkan AI menganalisis gambar",
        content: "Teknologi AI kami akan memproses gambar dan mencocokkannya dengan database tanaman herbal Indonesia.",
    },
    {
        title: "Hasil instan dengan informasi penting",
        content: "Kamu akan langsung melihat nama tanaman, manfaat, dan deskripsinya.",
    },
    {
        title: "Download hasilnya",
        content: "Simpan hasil identifikasi untuk dibaca kembali atau dibagikan.",
    },
];

const Steps = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleIndex = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="mx-auto w-full max-w-7xl overflow-hidden px-4 py-12">
            <div className="flex flex-col-reverse items-center gap-12 lg:flex-row lg:items-start lg:justify-between">
                {/* Left Section */}
                <div className="flex w-full flex-col gap-3 lg:w-2/4">
                    <div className="bg-green-second-light text-green-primary inline-flex max-w-max items-center justify-center rounded-full px-4 py-1">
                        <p className="text-lg">Langkah - langkah</p>
                    </div>
                    <div className="flex flex-col gap-1 text-start">
                        <div className="text-font-primary text-3xl font-bold">Bagaimana daunesia bekerja</div>
                        <p className="text-font-primary text-lg">Empat langkah mudah untuk mengenal kekayaan herbal Indonesia.</p>
                    </div>
                    <ul className="flex flex-col gap-6">
                        {steps.map((step, i) => (
                            <motion.li
                                key={i}
                                className="flex flex-col gap-2"
                                initial={{ opacity: 0, x: -20 }}
                                // Menggunakan whileInView untuk memicu animasi saat terlihat
                                whileInView={{ opacity: 1, x: 0 }}
                                // `viewport` memastikan animasi hanya berjalan sekali
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <button onClick={() => toggleIndex(i)} className="flex w-full items-start gap-4 text-left">
                                    <div className="bg-green-light text-font-primary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-bold">{i + 1}</div>
                                    <span className="text-font-primary mt-1 flex-1 text-base font-medium">{step.title}</span>
                                    <motion.div className="text-font-primary ml-auto flex items-center" animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </motion.div>
                                </button>
                                <AnimatePresence initial={false}>
                                    {openIndex === i && (
                                        <motion.div className="text-font-secondary ml-12 overflow-hidden text-sm" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }}>
                                            <p className="pt-1 pb-2">{step.content}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.li>
                        ))}
                    </ul>
                </div>

                {/* Right Section */}
                <div className="flex w-full justify-center lg:max-w-xl">
                    <motion.img
                        src={StepsImg}
                        className="w-full max-w-xl"
                        draggable={false}
                        initial={{ opacity: 0, scale: 0.9 }}
                        // Menggunakan whileInView untuk memicu animasi saat terlihat
                        whileInView={{ opacity: 1, scale: 1 }}
                        // `viewport` memastikan animasi hanya berjalan sekali
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                    />
                </div>
            </div>
        </section>
    );
};

export default Steps;
