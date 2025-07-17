"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

import contohDeteksi from "@/assets/images/contohDeteksi.svg";
import searchIcons from "@/assets/icons/searchIcons.svg";
import accurationIcons from "@/assets/icons/accurationIcons.svg";

export default function DeteksiPage() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => setMounted(true), 100); // delay agar tidak abrupt
		return () => clearTimeout(timeout);
	}, []);

	return (
		<motion.div initial={{ opacity: 0, y: 40 }} animate={mounted ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }} className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
			{/* Header */}
			<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex w-full flex-col items-center gap-3 px-5">
				<div className="flex flex-col gap-1 text-center">
					<h2 className="text-font-primary text-3xl font-bold">Unggah, Kenali, dan Pelajari</h2>
					<p className="text-font-primary w-155 text-lg">Daunesia membantumu mengenal kekayaan tanaman herbal Indonesia. Unggah foto daun, akar, bunga, atau biji dan sistem kami akan mengenalinya beserta nama lokal dan khasiatnya.</p>
				</div>
			</motion.div>

			{/* Deteksi Section */}
			<motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }} className="mx-auto max-w-7xl flex flex-col-reverse gap-12 p-6 lg:flex-row lg:gap-20 rounded-2xl bg-gradient-to-r from-[#E7F3E7] to-[#B5D6B3] my-12">
				{/* Left Column */}
				<motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex w-full flex-col gap-4 lg:w-2/6">
					<div className="bg-white p-6 rounded-xl shadow-lg">
						<motion.div className="border-green-primary flex h-70 w-full flex-col items-center justify-center gap-4 rounded-lg border-[2px] border-dashed">
							<svg width="70" height="70" viewBox="0 0 98 98" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M10.2084 46.9583V14.2083C10.2084 11.9992 11.9992 10.2083 14.2084 10.2083H83.7917C86.0008 10.2083 87.7917 11.9992 87.7917 14.2083V83.7917C87.7917 86.0008 86.0008 87.7917 83.7917 87.7917H14.2084C11.9992 87.7917 10.2084 86.0008 10.2084 83.7917V63.2917" stroke="#537D5D" strokeWidth="4.5" strokeLinecap="round" />
								<path d="M16.3334 53.0833L28.9305 40.4862C29.8129 39.6038 31.2788 39.736 31.9891 40.7619L47.7665 63.5506C48.4312 64.5106 49.7735 64.6995 50.6773 63.9601L70.0575 48.104C70.8528 47.4533 72.0117 47.5111 72.7382 48.2377L87.7917 63.2917" stroke="#537D5D" strokeWidth="4.5" strokeLinecap="round" />
								<circle cx="67.375" cy="30.625" r="6.125" fill="#537D5D" stroke="#537D5D" strokeWidth="4.5" strokeLinecap="round" />
							</svg>
							<div className="inline-flex flex-col items-start justify-start">
								<div className="flex flex-col items-center justify-start self-stretch">
									<div className="text-green-secondary justify-center text-center leading-tight font-medium">Unggah gambar tanaman</div>
								</div>
								<div className="flex flex-col items-center justify-start self-stretch">
									<div className="justify-center text-center">
										<span className="text-green-secondary text-sm leading-none font-normal">Seret atau</span>
										<span className="text-green-secondary text-sm leading-none font-bold">
											<a href=""> unggah gambar</a>
										</span>
									</div>
								</div>
							</div>
						</motion.div>

						{/* Search Input */}
						<div className="relative my-2.5">
							<img src={searchIcons} alt="" className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" />
							<input type="text" placeholder="Cari berdasarkan nama tanaman" className="w-full h-9 pl-9 pr-3 bg-neutral-100 rounded-lg border text-font-primary border-zinc-800/40 focus:outline-none" />
						</div>

						{/* Buttons */}
						<div className="flex gap-2 mt-2">
							<button className="flex-1 flex items-center justify-center gap-2 rounded-full bg-green-light px-5 py-2 text-white">Bersihkan</button>
							<button className="flex-1 flex items-center justify-center gap-2 rounded-full border-2 border-green-light bg-white px-5 py-2 text-green-light">Mulai Deteksi</button>
						</div>
					</div>

					{/* Accuracy Label */}
					<motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="text-center max-w-max text-sm bg-white p-2 rounded-lg shadow-md flex items-center gap-2">
						<img src={accurationIcons} alt="Akurasi" className="h-5 w-5" />
						<p className="text-font-primary text-sm font-semibold">98% Akurat.</p>
					</motion.div>
				</motion.div>

				{/* Right Column */}
				<motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="flex w-full flex-col gap-4 lg:w-5/8">
					<h3 className="text-font-primary text-2xl font-bold">Tanaman Herbal yang Dapat Dikenali</h3>
					<img src={contohDeteksi} alt="" height={500} />
				</motion.div>
			</motion.section>
		</motion.div>
	);
}
