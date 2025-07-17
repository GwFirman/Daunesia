"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "motion/react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client"; // pastikan ini path ke authClient kamu

import "swiper/css";
import "swiper/css/effect-fade";

import Daunesia from "@/assets/icons/logo/LogoDaunesia.png";
import carousel1 from "@/assets/images/crousel1.png";
import carousel2 from "@/assets/images/crousel2.png";
import carousel3 from "@/assets/images/crousel3.png";
import { redirect, useRouter } from "next/navigation";

const carouselData = [{ image: carousel1 }, { image: carousel2 }, { image: carousel3 }];

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const handleLogin = async () => {
		await authClient.signIn.email({
			email,
			password,
			fetchOptions: {
				onSuccess: () => {
					router.push("/");
				},
			},
		});
	};

	const { data, isPending } = authClient.useSession();

	if (data) {
		redirect("/");
	}

	if (isPending) return null;

	return (
		<motion.div className="flex h-screen max-w-screen bg-neutral-100" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}>
			<div className="max-w-8xl mx-auto flex min-h-screen w-full flex-row gap-4">
				{/* Left Panel */}
				<motion.div className="flex flex-1 p-5" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, duration: 0.7, ease: "easeOut" }}>
					<div className="flex flex-1 flex-col rounded-2xl bg-white p-4">
						<div className="flex flex-row items-center">
							<motion.img animate={{ opacity: [0, 1] }} transition={{ duration: 1.2 }} src={Daunesia.src} alt="Logo Daunesia" className="h-12" />
							<motion.div animate={{ x: [20, 0], opacity: [0, 1] }} transition={{ duration: 0.8, delay: 0.2 }} className="text-font-primary mr-4 ml-auto font-medium">
								<p className="hidden lg:inline">{"Belum ada akun? "}</p>
								<Link href={"/register"} className="text-green-primary hover:underline">
									Daftar
								</Link>
							</motion.div>
						</div>

						<div className="mt-18 flex flex-1 justify-center">
							<div className="flex w-full max-w-lg flex-1 flex-col gap-4">
								<div className="flex flex-col gap-1">
									<motion.div animate={{ y: [-12, 0], opacity: [0, 1] }} transition={{ duration: 1.3 }} className="text-font-primary text-4xl font-bold">
										Masuk Sekarang
									</motion.div>
									<motion.div animate={{ y: [-12, 0], opacity: [0, 1] }} transition={{ duration: 1.3, delay: 0.2 }} className="text-md text-font-secondary">
										Silakan masukkan informasi Anda untuk masuk ke akun.
									</motion.div>
								</div>

								{/* Sosial Login */}
								<motion.div animate={{ y: [20, 0], opacity: [0, 1] }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-4 flex w-full flex-col gap-4 lg:flex-row">
									{/* Google */}
									<motion.div
										onClick={async () => {
											await authClient.signIn.social({
												provider: "google",
												callbackURL: "/deteksi",
											});
										}}
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										className="flex h-12 w-full items-center justify-center rounded-lg border-2 border-zinc-800/40 bg-white"
									>
										<div className="mr-2">{/* Google Logo SVG */}</div>
										<p className="text-font-primary font-medium">Login dengan Google</p>
									</motion.div>

									{/* Facebook */}
									<motion.div
										onClick={async () => {
											await authClient.signIn.social({
												provider: "facebook",
												callbackURL: "/deteksi",
											});
										}}
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										className="flex h-12 w-full items-center justify-center rounded-lg border-2 border-zinc-800/40 bg-white"
									>
										<motion.div animate={{ scale: [0.8, 1], opacity: [0, 1] }} transition={{ duration: 0.6, delay: 0.8 }} className="mr-2">
											{/* Facebook Logo SVG */}
										</motion.div>
										<p className="text-font-primary font-medium">Login dengan Facebook</p>
									</motion.div>
								</motion.div>

								{/* Divider */}
								<motion.div animate={{ y: [20, 0], opacity: [0, 1] }} transition={{ duration: 0.8, delay: 0.6 }} className="flex items-center gap-6">
									<motion.div animate={{ scaleX: [0, 1] }} transition={{ duration: 0.8, delay: 0.8 }} className="h-0.5 w-full rounded-lg bg-zinc-300" />
									<motion.div animate={{ scale: [0, 1], opacity: [0, 1] }} transition={{ duration: 0.6, delay: 1 }} className="text-font-secondary text-base">
										atau
									</motion.div>
									<motion.div animate={{ scaleX: [0, 1] }} transition={{ duration: 0.8, delay: 0.8 }} className="h-0.5 w-full rounded-lg bg-zinc-300" />
								</motion.div>

								{/* Email */}
								<motion.div animate={{ y: [20, 0], opacity: [0, 1] }} transition={{ duration: 0.8, delay: 0.8 }} className="flex w-full flex-col gap-2">
									<div className="text-font-primary text-sm font-medium">Email</div>
									<motion.div whileFocus={{ scale: 1.02 }}>
										<Input type="email" placeholder="Masukan email kamu" value={email} onChange={(e) => setEmail(e.target.value)} className="placeholder:text-font-secondary border-font-secondary text-font-primary h-10 rounded-lg border-2 bg-white px-4" />
									</motion.div>
								</motion.div>

								{/* Password */}
								<motion.div animate={{ y: [20, 0], opacity: [0, 1] }} transition={{ duration: 0.8, delay: 1 }} className="flex w-full flex-col gap-2">
									<div className="text-font-primary text-sm font-medium">Password</div>
									<div className="relative">
										<motion.div whileFocus={{ scale: 1.02 }}>
											<Input type="password" placeholder="Masukan password kamu" value={password} onChange={(e) => setPassword(e.target.value)} className="placeholder:text-font-secondary border-font-secondary text-font-primary h-10 rounded-lg border-2 bg-white px-4" />
										</motion.div>
										<div className="absolute top-4 right-4"></div>
									</div>
								</motion.div>

								<motion.div animate={{ x: [20, 0], opacity: [0, 1] }} transition={{ duration: 0.6, delay: 1.2 }} className="text-green-primary -mt-3 mb-2 text-right font-medium">
									<a href="">Lupa password?</a>
								</motion.div>

								{/* Tombol Login */}
								<motion.div animate={{ y: [20, 0], opacity: [0, 1] }} transition={{ duration: 0.8, delay: 1.4 }} className="flex w-full flex-col gap-4">
									<div className="mt-2 w-full">
										<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
											<Button onClick={handleLogin} className="h-12 w-full cursor-pointer rounded-lg font-medium text-white" style={{ background: "linear-gradient(to right, #537D5D, #73946B)" }}>
												Masuk
											</Button>
										</motion.div>
									</div>
								</motion.div>
							</div>
						</div>
					</div>
				</motion.div>

				{/* Right Panel */}
				<motion.div className="-ml-10 hidden w-full max-w-md p-5 lg:flex" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}>
					<Swiper
						modules={[Autoplay, EffectFade]}
						effect="fade"
						loop={true}
						autoplay={{
							delay: 3000,
							disableOnInteraction: false,
						}}
						className="h-full w-full rounded-2xl"
					>
						{carouselData.map((slide, idx) => (
							<SwiperSlide key={idx}>
								<div className="relative h-full w-full">
									<img src={slide.image.src} className="h-full w-full scale-105 object-cover transition-transform duration-1000 ease-in-out" style={{ filter: "brightness(0.85)" }} />
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</motion.div>
			</div>
		</motion.div>
	);
}
