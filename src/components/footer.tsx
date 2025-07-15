const Footer = () => {
    return (
        <footer className="bg-green-primary text-white pt-10">
            <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-start px-4">
                <div className="flex-1 mb-5">
                    <h3 className="text-2xl font-semibold mb-3">Daunesia</h3>
                    <p className="text-base leading-relaxed w-80">Menjelajahi dunia herbal dengan AI, terinspirasi oleh tradisi penyembuhan Nusantara.</p>
                </div>
                <div className="flex-1 min-w-[200px] mb-5 text-right">
                    <h3 className="text-2xl font-semibold mb-3">Kontak kami</h3>
                    <p className="text-base mb-1">+62123-456-789</p>
                    <p className="text-base mb-1">kurawal.creative@gmail.com </p>
                    <p className="text-base">Purwokerto, Indonesia</p>
                </div>
            </div>
            <div className="bg-font-primary text-white text-center py-4 mt-5">
                <p className="text-sm m-0">© 2025 Daunesia. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;