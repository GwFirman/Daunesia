"use client";

import { useState } from "react";
import { FaInstagram, FaGithub } from "react-icons/fa";
import { motion } from "motion/react";
import { Playwrite_DE_LA } from "next/font/google";

import firman from "@/assets/images/pic/Firman.jpg";
import fauzan from "@/assets/images/pic/Fauzan.jpg";
import iyan from "@/assets/images/pic/Iyan.jpg";

const playwrite = Playwrite_DE_LA({
	display: "swap",
});

const TeamList = [
	{
		name: "Firman Zamzami",
		role: "Machine Learning Developer",
		image: firman,
		social: {
			github: "https://github.com/GwFirman",
			instagram: "https://www.instagram.com/gw_firman/?hl=id",
		},
	},
	{
		name: "Akhmad Fauzan",
		role: "Backend Developer",
		image: fauzan,
		social: {
			github: "https://github.com/ozan-fn",
			instagram: "https://www.instagram.com/ozan.fn/?hl=id",
		},
	},
	{
		name: "Agus Priyanto",
		role: "Frontend Developer",
		image: iyan,
		social: {
			github: "https://github.com/Astha4Study",
			instagram: "https://www.instagram.com/rheiyn._/?hl=id",
		},
	},
];

export default function TentangKamiPage() {
	const [, setIsTeamVisible] = useState(false);

	return (
		<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }} className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
			{/* Header */}
			<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex w-full flex-col items-center gap-3 px-5">
				<div className="bg-green-second-light text-green-primary inline-flex items-center justify-center rounded-full px-4 py-1">
					<p className="text-lg">Tim Kami</p>
				</div>
				<div className="flex flex-col gap-1 text-center">
					<h2 className="text-font-primary text-3xl font-bold">Tim di Balik Layar</h2>
					<p className="text-font-primary text-lg">Orang-orang di balik Daunesia.</p>
				</div>
			</motion.div>

			{/* Highlight Section */}
			<motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2, ease: [0.42, 0, 0.58, 1] }} className="text-font-primary mx-auto mt-10 max-w-7xl rounded-lg bg-[linear-gradient(90deg,_#E6E3BD_30%,_#C6DBA5_54%,_#A2C59A_86%,_#7BAF84_100%)] px-4 py-16 shadow-md">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div className="flex flex-col gap-2">
						<h3 className={`sm:font-3xl text-2xl font-bold mb-2 ${playwrite.className}`}>Cara Modern Mengenal Herbal Lokal</h3>
						<p className="text-base leading-relaxed">Platform kami memberdayakan pengguna untuk menjelajahi tanaman herbal asli Indonesia melalui teknologi pengenalan daun berbasis AI. Cukup unggah foto untuk mengetahui nama tanaman, manfaat tradisional, dan nilai budayanya. Temukan kembali kearifan alam satu daun demi satu daun.</p>
					</div>
					<div className="flex items-center">
						<blockquote className="bg-white rounded-lg p-6 shadow-md">
							<span className="text-2xl text-green-primary font-bold">“</span>Misi kami adalah menghadirkan kembali kearifan herbal Indonesia dengan teknologi AI terkini, agar lebih mudah dipelajari, diakses, dan diterapkan oleh semua orang.<span className="text-2xl text-green-primary font-bold">”</span>
						</blockquote>
					</div>
				</div>
			</motion.section>

			{/* Team Section */}
			<motion.div onViewportEnter={() => setIsTeamVisible(true)} viewport={{ once: true }} className="mx-auto mt-16 grid w-full max-w-6xl grid-cols-1 gap-12 px-5 md:grid-cols-2 lg:grid-cols-3">
				{TeamList.map((team, index) => (
					<motion.div key={team.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.2 }} className="flex flex-col items-center text-center">
						<img src={team.image.src} alt={team.name} className="mb-4 h-32 w-32 rounded-full object-cover" />
						<h3 className="text-font-primary mb-1 text-xl font-bold">{team.name}</h3>
						<p className="text-font-secondary mb-2 text-sm">{team.role}</p>
						<div className="mt-2 flex space-x-4">
							{team.social.github && (
								<a href={team.social.github} target="_blank" rel="noopener noreferrer" className="text-font-primary">
									<FaGithub size={22} />
								</a>
							)}
							{team.social.instagram && (
								<a href={team.social.instagram} target="_blank" rel="noopener noreferrer" className="text-font-primary">
									<FaInstagram size={22} />
								</a>
							)}
						</div>
					</motion.div>
				))}
			</motion.div>
		</motion.div>
	);
}
