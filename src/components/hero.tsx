import image_home from "@/assets/images/image_home.png";
import { Link } from "react-router";

const hero = () => {
    return (
        <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-12 px-5 py-8">
            <div className="flex flex-1 flex-col-reverse items-center justify-center gap-8 lg:flex-row lg:justify-between">
                <div className="mt-8 flex w-full max-w-lg flex-col gap-4">
                    <p className="text-font-primary text-4xl font-bold">Kenali tumbuh-tumbuhan bermanfaat dari Indonesia, cukup lewat satu foto.</p>
                    <p className="text-font-primary text-xl font-light">Dengan teknologi AI, Daunesia membantumu mengidentifikasi berbagai tanaman herbal lokal Indonesia.</p>

                    <div className="flex w-full max-w-sm flex-col gap-4 lg:flex-row">
                        <div className="inline-flex h-12 items-center justify-center rounded-full px-6 py-4" style={{ background: "linear-gradient(to right, #537D5D, #73946B)" }}>
                            <Link to={"/deteksi"} className="justify-center text-center leading-tight font-medium text-white">
                                Mulai Sekarang
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <img src={image_home} className="w-full max-w-sm lg:max-w-xl" alt="" />
                </div>
            </div>

            <div className="flex mt-8 h-80 flex-col items-center justify-center gap-4 rounded-2xl border-[3px] border-dashed border-green-primary shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]">
                <svg width="98" height="98" viewBox="0 0 98 98" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.2084 46.9583V14.2083C10.2084 11.9992 11.9992 10.2083 14.2084 10.2083H83.7917C86.0008 10.2083 87.7917 11.9992 87.7917 14.2083V83.7917C87.7917 86.0008 86.0008 87.7917 83.7917 87.7917H14.2084C11.9992 87.7917 10.2084 86.0008 10.2084 83.7917V63.2917" stroke="#537D5D" stroke-width="4.5" stroke-linecap="round" />
                    <path d="M16.3334 53.0833L28.9305 40.4862C29.8129 39.6038 31.2788 39.736 31.9891 40.7619L47.7665 63.5506C48.4312 64.5106 49.7735 64.6995 50.6773 63.9601L70.0575 48.104C70.8528 47.4533 72.0117 47.5111 72.7382 48.2377L87.7917 63.2917" stroke="#537D5D" stroke-width="4.5" stroke-linecap="round" />
                    <circle cx="67.375" cy="30.625" r="6.125" fill="#537D5D" stroke="#537D5D" stroke-width="4.5" stroke-linecap="round" />
                </svg>

                <div className="inline-flex flex-col items-start justify-start">
                    <div className="flex flex-col items-center justify-start self-stretch">
                        <div className="justify-center text-center leading-tight font-medium text-green-secondary">Unggah gambar tanaman</div>
                    </div>
                    <div className="flex flex-col items-center justify-start self-stretch">
                        <div className="justify-center text-center">
                            <span className="text-sm leading-none font-normal text-green-secondary">Seret gambar ke sini atau </span>
                            <span className="text-sm leading-none font-bold text-green-secondary"><a href="">klik untuk unggah dari perangkat</a></span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default hero;
