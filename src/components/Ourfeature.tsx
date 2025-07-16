import cameraIcons from "@/assets/icons/cameraIcons.svg";
import shieldIcons from "@/assets/icons/shieldIcons.svg";
import geminiIcons from "@/assets/icons/geminiIcons.svg";
import { Meteors } from "./ui/meteors";

const features = [
    {
        icons: cameraIcons,
        title: "Cepat dan Mudah",
        description: "Tanpa perlu pengetahuan teknis. Cukup ambil atau unggah foto daun tanaman herbal, dan sistem kami akan langsung memprosesnya serta menampilkan hasilnya dengan cepat. Proses identifikasi yang rumit kini ada di ujung jarimu.",
    },
    {
        icons: shieldIcons,
        title: "Akurasi Tinggi & Terpercaya",
        description: "Platform kami didukung oleh model machine learning canggih seperti ConvNeXt, yang telah terbukti mampu mencapai akurasi hingga 92,5% dalam mengenali gambar tanaman herbal.",
    },
    {
        icons: geminiIcons,
        title: "Diperkuat oleh Gemini AI",
        description: "Kami menggunakan teknologi Gemini AI untuk memberikan penjelasan yang lebih lengkap dan mudah dipahami tentang manfaat serta cara pengolahan tanaman. Setiap tanaman yang kamu temukan akan dilengkapi dengan deskripsi singkat dan informasi kontekstual yang bermanfaat.",
    },
];

const Feature = () => {
    return (
        <section className="flex flex-col items-center gap-12 py-12">
            <div className="flex w-full max-w-7xl flex-col items-center gap-3 px-5">
                <div className="bg-green-second-light text-green-primary inline-flex items-center justify-center rounded-full px-4 py-1">
                    <p className="text-lg">Fitur Unggulan</p>
                </div>

                <div className="flex flex-col gap-1 text-center">
                    <div className="text-font-primary text-3xl font-bold">Kenapa Harus Daunesia?</div>
                    <p className="text-font-primary max-w-200 text-lg font-normal break-words">Daunesia menggabungkan kearifan lokal dengan teknologi modern untuk membantumu memahami tanaman di sekitarmu.</p>
                </div>

                {/* Cards */}
                <div className="mt-8 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((item, index) => (
                        <div key={index} className="border-green-secondary relative overflow-hidden rounded-xl border p-6 text-left shadow-sm">
                            <div className="mb-4 flex items-center gap-2">
                                <div className="flex h-10 items-center justify-center rounded-full">
                                    <img src={item.icons} alt="icon" />
                                </div>
                            </div>
                            <h3 className="text-font-primary mb-2 text-lg font-semibold">{item.title}</h3>
                            <p className="text-font-secondary text-sm">{item.description}</p>
                            <Meteors number={16} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Feature;
