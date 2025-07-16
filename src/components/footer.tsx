import { motion } from "framer-motion";

const Footer = () => {
    return (
        <motion.footer initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }} className="bg-green-primary mt-auto pt-10 text-white">
            <div className="mx-auto flex max-w-7xl flex-wrap items-start justify-between px-4">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-5 flex-1">
                    <h3 className="mb-3 text-2xl font-semibold">Daunesia</h3>
                    <p className="w-80 text-base leading-relaxed">Menjelajahi dunia herbal dengan AI, terinspirasi oleh tradisi penyembuhan Nusantara.</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="mb-5 min-w-[200px] flex-1 text-right">
                    <h3 className="mb-3 text-2xl font-semibold">Kontak kami</h3>
                    <p className="mb-1 text-base">+62123-456-789</p>
                    <p className="mb-1 text-base">kurawal.creative@gmail.com </p>
                    <p className="text-base">Purwokerto, Indonesia</p>
                </motion.div>
            </div>
            <div className="bg-font-primary mt-5 py-4 text-center text-white">
                <p className="m-0 text-sm">© {new Date().getFullYear()} Daunesia. All rights reserved.</p>
            </div>
        </motion.footer>
    );
};

export default Footer;
