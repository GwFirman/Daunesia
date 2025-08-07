"use client";

import { motion } from "motion/react";

const Footer = () => {
	return (
		<motion.footer
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.2 }}
			transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
			className="bg-green-primary mt-auto pt-10 text-white"
		>
			<div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 md:flex-row md:items-start md:justify-between md:gap-4 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="flex-1"
				>
					<h3 className="mb-3 text-xl font-semibold sm:text-2xl">Daunesia</h3>
					<p className="max-w-md text-sm leading-relaxed sm:text-base">
						Menjelajahi dunia herbal dengan AI, terinspirasi oleh tradisi penyembuhan Nusantara.
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="flex-1 text-left md:text-right"
				>
					<h3 className="mb-3 text-xl font-semibold sm:text-2xl">Kontak kami</h3>
					<p className="mb-1 text-sm sm:text-base">+62 123-456-789</p>
					<p className="mb-1 text-sm sm:text-base">kurawal.creative@gmail.com</p>
					<p className="text-sm sm:text-base">Purwokerto, Indonesia</p>
				</motion.div>
			</div>

			<div className="bg-font-primary mt-8 py-4 px-4 text-center text-white text-sm">
				<p className="m-0">© {new Date().getFullYear()} Daunesia. All rights reserved.</p>
			</div>
		</motion.footer>
	);
};

export default Footer;
