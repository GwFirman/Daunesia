const Footer = () => {
    return (
        <footer className="bg-green-primary mt-auto pt-10 text-white">
            <div className="mx-auto flex max-w-7xl flex-wrap items-start justify-between px-4">
                <div className="mb-5 flex-1">
                    <h3 className="mb-3 text-2xl font-semibold">Daunesia</h3>
                    <p className="w-80 text-base leading-relaxed">Menjelajahi dunia herbal dengan AI, terinspirasi oleh tradisi penyembuhan Nusantara.</p>
                </div>
                <div className="mb-5 min-w-[200px] flex-1 text-right">
                    <h3 className="mb-3 text-2xl font-semibold">Kontak kami</h3>
                    <p className="mb-1 text-base">+62123-456-789</p>
                    <p className="mb-1 text-base">kurawal.creative@gmail.com </p>
                    <p className="text-base">Purwokerto, Indonesia</p>
                </div>
            </div>
            <div className="bg-font-primary mt-5 py-4 text-center text-white">
                <p className="m-0 text-sm">© {new Date().getFullYear()} Daunesia. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
