import { useState } from "react";
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
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleIndex = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="mx-auto w-full max-w-7xl px-5 py-12">
            <div className="flex flex-col-reverse items-center gap-12 lg:flex-row lg:items-start lg:justify-between">
                {/* Left Section */}
                <div className="flex w-full flex-col gap-6 lg:w-2/4">
                    <div className="bg-green-second-light text-green-primary inline-flex max-w-max items-center justify-center rounded-full px-6 py-2">
                        <p className="text-lg">Langkah - langkah</p>
                    </div>
                    <div className="flex flex-col gap-1 text-start">
                        <div className="text-font-primary text-3xl font-bold">Bagaimana daunesia bekerja</div>
                        <p className="text-font-primary text-lg">Empat langkah mudah untuk mengenal kekayaan herbal Indonesia.</p>
                    </div>
                    <ul className="flex flex-col gap-4">
                        {steps.map((step, i) => (
                            <li key={i} className="flex flex-col gap-2">
                                <button onClick={() => toggleIndex(i)} className="flex w-full items-start gap-4 text-left">
                                    <div className="bg-green-light text-font-primary flex h-8 w-8 items-center justify-center rounded-full font-bold">{i + 1}</div>
                                    <span className="text-font-primary mt-1 flex-1 text-base font-medium">{step.title}</span>
                                    <div className="text-font-primary flex items-center ml-20">
                                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>
                                {openIndex === i && <div className="text-font-secondary mt-1 ml-12 text-sm">{step.content}</div>}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right Section */}
                <div className="mt-6 flex w-full justify-center lg:max-w-2/6">
                    <img src={StepsImg} alt="Steps" className="w-full max-w-xl" />
                </div>
            </div>
        </section>
    );
};

export default Steps;
