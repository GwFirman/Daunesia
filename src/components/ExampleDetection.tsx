import HasilDeteksi from "@/assets/images/hasilDeteksi.svg";

const ContohDeteksi = () => {
    return (
        <section className="flex flex-col items-center gap-6 py-12">
            <div className="flex w-full max-w-7xl flex-col items-center gap-3 px-5">
                <div className="bg-green-second-light text-green-primary inline-flex items-center justify-center rounded-full px-4 py-1">
                    <p className="text-lg">Contoh Hasil Deteksi</p>
                </div>

                <div className="flex flex-col gap-1 text-center">
                    <div className="text-font-primary text-3xl font-bold">Kenali Tanaman Herbal Populer</div>
                    <p className="text-font-primary text-lg font-normal">Beberapa contoh daun yang bisa kamu identifikasi langsung dengan Daunesia.</p>
                </div>

                <div className="mt-8 flex w-full justify-start">
                    <img src={HasilDeteksi} alt="" className="h-100" draggable={false} />
                </div>
            </div>
        </section>
    );
};

export default ContohDeteksi;
