"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import StepsImg from "@/assets/images/steps.png";

const steps = [
	{
		title: "Unggah foto tanaman",
		content: "Ambil atau pilih foto tanaman yang ingin kamu identifikasi melalui aplikasi Daunesia.",
	},
	{
		title: "Biarkan AI menganalisis gambar",
		content: "Teknologi AI kami akan memproses gambar dan mencocokkannya dengan database tanaman herbal Indonesia.",
	},
	{
		title: "Hasil instan dengan informasi penting",
		content: "Kamu akan langsung melihat nama tanaman, manfaat, dan deskripsinya.",
	},
	{
		title: "Download hasilnya",
		content: "Simpan hasil identifikasi untuk dibaca kembali atau dibagikan.",
	},
];

const Steps = () => {
	const [openIndex, setOpenIndex] = useState<number | null>(0);

	const toggleIndex = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<section className="mx-auto w-full max-w-7xl overflow-hidden px-4 py-12 md:py-16">
			<div className="flex flex-col-reverse items-center gap-12 lg:flex-row lg:items-start lg:justify-between">
				{/* Left Section */}
				<div className="flex w-full flex-col gap-2.5 lg:w-2/4">
					<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }} className="bg-green-second-light text-green-primary inline-flex max-w-max items-center justify-center rounded-full px-3 py-1 md:px-4 md:py-1">
						<p className="text-sm md:text-lg">Langkah - langkah</p>
					</motion.div>

					<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: 0.2, ease: [0.42, 0, 0.58, 1] }} className="flex flex-col gap-1 text-start">
						<h6 className="text-font-primary text-2xl md:text-3xl font-bold">Bagaimana daunesia bekerja</h6>
						<p className="text-font-primary text-md md:text-lg">Empat langkah mudah untuk mengenal kekayaan herbal Indonesia.</p>
					</motion.div>
					<ul className="flex flex-col gap-4 md:gap-6">
						{steps.map((step, i) => (
							<motion.li
								key={i}
								className="flex flex-col gap-0.5 md:gap-2"
								variants={{
									hidden: { opacity: 0, x: -20 },
									visible: { opacity: 1, x: 0 },
								}}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, amount: 0.3 }}
								transition={{ duration: 0.6, delay: i * 0.2, ease: [0.42, 0, 0.58, 1] }}
							>
								<button onClick={() => toggleIndex(i)} className="flex w-full items-start gap-4 text-left">
									<div className="bg-green-light text-font-primary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-bold">{i + 1}</div>
									<span className="text-font-primary mt-1 flex-1 text-base font-medium">{step.title}</span>
									<motion.div className="text-font-primary ml-auto flex items-center" animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
										<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
										</svg>
									</motion.div>
								</button>
								<AnimatePresence initial={false}>
									{openIndex === i && (
										<motion.div className="text-font-secondary ml-12 overflow-hidden text-sm" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }}>
											<p className="pt-1 pb-2">{step.content}</p>
										</motion.div>
									)}
								</AnimatePresence>
							</motion.li>
						))}
					</ul>
				</div>

				{/* Right Section */}
				<div className="flex w-full justify-center lg:max-w-md">
					<motion.img src={StepsImg.src} className="hidden md:block w-full max-w-xl" draggable={false} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1], delay: 0.4 }} />
				</div>
			</div>
		</section>
	);
};

export default Steps;
