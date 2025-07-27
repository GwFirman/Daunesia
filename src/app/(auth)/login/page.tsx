"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "motion/react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { redirect, useRouter } from "next/navigation";

import "swiper/css";
import "swiper/css/effect-fade";

import Daunesia from "@/assets/icons/logo/LogoDaunesia.png";
import carousel1 from "@/assets/images/crousel1.png";
import carousel2 from "@/assets/images/crousel2.png";
import carousel3 from "@/assets/images/crousel3.png";

const carouselData = [{ image: carousel1 }, { image: carousel2 }, { image: carousel3 }];

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loadingProvider, setLoadingProvider] = useState<null | "google" | "facebook">(null);

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
						<div className="flex flex-row items-center m-2">
							<motion.img animate={{ opacity: [0, 1] }} transition={{ duration: 1.2 }} src={Daunesia.src} alt="Logo Daunesia" className="h-8" />
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

								{/* Social Login */}
								<motion.div animate={{ y: [20, 0], opacity: [0, 1] }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-4 flex w-full flex-col gap-4 lg:flex-row">
									{/* Google */}
									<motion.div
										onClick={async () => {
											setLoadingProvider("google");
											await authClient.signIn.social({
												provider: "google",
												callbackURL: "/deteksi",
											});
											setLoadingProvider(null);
										}}
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-zinc-800/40 bg-white cursor-pointer"
									>
										{/* Google Logo */}
										<svg className="h-5 w-5" viewBox="0 0 48 48">
											<path fill="#fbc02d" d="M43.6 20.5H42V20H24v8h11.3C33.3 32.3 29.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.3 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-9 20-20 0-1.3-.1-2.7-.4-3.5z" />
											<path fill="#e53935" d="M6.3 14.6l6.6 4.8C14.4 16.2 18.9 14 24 14c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.3 29.6 4 24 4c-7.3 0-13.6 3.9-17.1 9.6z" />
											<path fill="#4caf50" d="M24 44c5.1 0 9.9-1.9 13.5-5.1l-6.2-5.2C29.6 35.7 26.9 37 24 37c-5 0-9.2-3.3-10.7-7.9l-6.6 5.1C10.3 39.6 16.7 44 24 44z" />
											<path fill="#1565c0" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.3 5.7-6.1 7.2l6.2 5.2c-0.4 0.3 6.6-4.8 6.6-13.9 0-1.3-.1-2.7-.4-3.5z" />
										</svg>
										<p className="text-font-primary font-medium">{loadingProvider === "google" ? "Loading..." : "Login dengan Google"}</p>
									</motion.div>

									{/* Facebook */}
									<motion.div
										onClick={async () => {
											setLoadingProvider("facebook");
											await authClient.signIn.social({
												provider: "facebook",
												callbackURL: "/deteksi",
											});
											setLoadingProvider(null);
										}}
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-zinc-800/40 bg-white cursor-pointer"
									>
										{/* Facebook Logo */}
										<svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
											<path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.404.597 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z" />
										</svg>
										<p className="text-font-primary font-medium">{loadingProvider === "facebook" ? "Loading..." : "Login dengan Facebook"}</p>
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
									<Input type="email" placeholder="Masukan email kamu" value={email} onChange={(e) => setEmail(e.target.value)} className="placeholder:text-font-secondary border-font-secondary text-font-primary h-10 rounded-lg border-2 bg-white px-4" />
								</motion.div>

								{/* Password */}
								<motion.div animate={{ y: [20, 0], opacity: [0, 1] }} transition={{ duration: 0.8, delay: 1 }} className="flex w-full flex-col gap-2">
									<div className="text-font-primary text-sm font-medium">Password</div>
									<div className="relative">
										<Input type="password" placeholder="Masukan password kamu" value={password} onChange={(e) => setPassword(e.target.value)} className="placeholder:text-font-secondary border-font-secondary text-font-primary h-10 rounded-lg border-2 bg-white px-4" />
									</div>
								</motion.div>

								<motion.div animate={{ x: [20, 0], opacity: [0, 1] }} transition={{ duration: 0.6, delay: 1.2 }} className="text-green-primary -mt-3 mb-2 text-right font-medium">
									<Link href={"/forgot-password"}>Lupa password?</Link>
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
