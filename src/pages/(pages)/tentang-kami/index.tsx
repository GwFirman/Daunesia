import firman from "@/assets/images/pic/Firman.jpg";
import fauzan from "@/assets/images/pic/Fauzan.jpg";
import iyan from "@/assets/images/pic/Iyan.jpg";
import { Github, Instagram } from "lucide-react";

const TeamList = [
    {
        name: "Firman Zamzami",
        role: "Machine Learning Developer",
        image: firman,
        social: {
            github: "https://github.com/GwFirman",
            instagram: "https://www.instagram.com/gw_firman/?hl=id",
        },
    },
    {
        name: "Akhmad Fauzan",
        role: "Backend Developer",
        image: fauzan,
        social: {
            github: "https://github.com/ozan-fn",
            instagram: "https://www.instagram.com/ozan.fn/?hl=id",
        },
    },
    {
        name: "Agus Priyanto",
        role: "Frontend Developer",
        image: iyan,
        social: {
            github: "https://github.com/Astha4Study",
            instagram: "https://www.instagram.com/rheiyn._/?hl=id",
        },
    },
];

export default function TentangKamiPage() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex w-full flex-col items-center gap-3 px-5">
                <div className="bg-green-second-light text-green-primary inline-flex items-center justify-center rounded-full px-4 py-1">
                    <p className="text-lg">Tim Kami</p>
                </div>
                <div className="flex flex-col gap-1 text-center">
                    <h2 className="text-font-primary text-3xl font-bold">Tim di Balik Layar</h2>
                    <p className="text-font-primary text-lg">Orang-orang di balik Daunesia.</p>
                </div>
            </div>

            {/* Highlight Section */}
            <section className="text-font-primary mx-auto mt-10 max-w-7xl rounded-lg bg-[linear-gradient(90deg,_#E6E3BD_30%,_#C6DBA5_54%,_#A2C59A_86%,_#7BAF84_100%)] px-4 py-16 shadow-md">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="flex flex-col gap-2">
                        <h3 className="font-Playwrite_DK_Loopet sm:font-3xl text-2xl font-bold italic">Cara Modern Mengenal Herbal Lokal</h3>
                        <p className="text-base leading-relaxed">Platform kami memberdayakan pengguna untuk menjelajahi tanaman herbal asli Indonesia melalui teknologi pengenalan daun berbasis AI. Cukup unggah foto untuk mengetahui nama tanaman, manfaat tradisional, dan nilai budayanya. Temukan kembali kearifan alam satu daun demi satu daun.</p>
                    </div>
                    <div className="flex items-center">
                        <blockquote className="rounded-lg bg-white p-6 text-base leading-relaxed font-normal text-gray-800 shadow-md">
                            <span className="text-green-primary text-2xl font-bold">“</span>Misi kami adalah menghadirkan kembali kearifan herbal Indonesia dengan teknologi AI terkini, agar lebih mudah dipelajari, diakses, dan diterapkan oleh semua orang. <span className="text-green-primary text-2xl font-bold">”</span>
                        </blockquote>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <div className="mx-auto mt-16 grid w-full max-w-6xl grid-cols-1 gap-12 px-5 md:grid-cols-2 lg:grid-cols-3">
                {TeamList.map((team) => (
                    <div key={team.name} className="flex flex-col items-center text-center">
                        <img src={team.image} alt={team.name} className="mb-4 h-32 w-32 rounded-full object-cover" />
                        <h3 className="text-font-primary mb-1 text-xl font-bold">{team.name}</h3>
                        <p className="text-font-secondary mb-2 text-sm">{team.role}</p>
                        <div className="mt-2 flex space-x-4">
                            {team.social.github && (
                                <a href={team.social.github} target="_blank" rel="noopener noreferrer" className="text-font-primary">
                                    <Github size={22} />
                                </a>
                            )}
                            {team.social.instagram && (
                                <a href={team.social.instagram} target="_blank" rel="noopener noreferrer" className="text-font-primary">
                                    <Instagram size={22} />
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
