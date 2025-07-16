// import { useState } from "react";
import { motion } from "framer-motion";

export default function DeteksiPage() {
    // const [deteksiVisible, setDeteksiVisible] = useState(false);

    return (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }} className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex w-full flex-col items-center gap-3 px-5">
                <div className="flex flex-col gap-1 text-center">
                    <h2 className="text-font-primary text-3xl font-bold">Unggah, Kenali, dan Pelajari</h2>
                    <p className="text-font-primary w-155 text-lg">Daunesia membantumu mengenal kekayaan tanaman herbal Indonesia. Unggah foto daun, akar, bunga, atau biji dan sistem kami akan mengenalinya beserta nama lokal dan khasiatnya.</p>
                </div>
            </motion.div>

            {/* Deteksi Section */}
            <motion.section></motion.section>
        </motion.div>
    );
}
