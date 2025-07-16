import chooseUsImg from "@/assets/images/chooseUs.png";
import { Link } from "react-router";

const chooseUs = () => {
    return (
        <section className="mx-auto w-full max-w-7xl py-12">
            <div className="flex flex-col-reverse items-center gap-12 lg:flex-row lg:items-start lg:justify-between">
                {/* Left Section */}
                <div className="-mt-6 flex w-full justify-center lg:max-w-120">
                    <img src={chooseUsImg} alt="Steps" className="w-full max-w-xl" draggable={false} />
                </div>

                {/* Rigth Section */}
                <div className="flex w-full flex-col gap-3 lg:w-2/4">
                    <div className="bg-green-second-light text-green-primary inline-flex max-w-max items-center justify-center rounded-full px-4 py-1">
                        <p className="text-lg">Pilih Daunesia</p>
                    </div>
                    <div className="flex flex-col gap-1 text-start">
                        <div className="text-font-primary text-3xl font-bold">Mulailah Petualangan Herbalmu Hari Ini</div>
                        <p className="text-font-primary text-lg">Bergabunglah bersama ribuan orang yang belajar mengenal tanaman herbal Indonesia lewat Daunesia.</p>
                    </div>
                    <div className="text-font-secondary flex flex-col gap-4">
                        <p>Indonesia kaya akan tanaman obat, namun banyak dari kita belum mengenalnyabaik nama maupun manfaatnya. Dengan Daunesia, kamu bisa mulai mengenali tanaman herbal cukup dengan mengunggah foto. Temukan khasiatnya, pelajari penggunaannya dalam tradisi, dan ikut melestarikan kearifan lokal satu daun dalam satu langkah.</p>
                    </div>
                    <div className="mt-8 flex w-full justify-start">
                        <Link className="inline-block rounded-full px-5.5 py-2.5 font-medium text-white" style={{ background: "linear-gradient(to right, #537D5D, #73946B)" }} to={"/deteksi"}>
                            Coba Deteksi Gambar Sekarang
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default chooseUs;
