"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "motion/react";
import { authClient } from "@/lib/auth-client"; // pastikan path ini sesuai

import "swiper/css";
import "swiper/css/effect-fade";

import Daunesia from "@/assets/icons/logo/LogoDaunesia.png";
import carousel1 from "@/assets/images/crousel1.png";
import carousel2 from "@/assets/images/crousel2.png";
import carousel3 from "@/assets/images/crousel3.png";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

const carouselData = [{ image: carousel1 }, { image: carousel2 }, { image: carousel3 }];

export default function Register() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const handleRegister = async () => {
		try {
			const { data, error } = await authClient.signUp.email({
				email,
				password,
				name: username,
				callbackURL: "/",
				fetchOptions: {
					onSuccess: () => {
						router.push("/login");
					},
				},
			});
			console.log("Sign-up result:", { data, error });
		} catch (err) {
			console.error("Sign-up failed:", err);
		}
	};

	const { data, isPending } = authClient.useSession();

	if (data) {
		redirect("/");
	}

	// if (isPending) return null;

	return (
		<motion.div className="flex h-screen max-w-screen bg-neutral-100" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}>
			<div className="max-w-8xl mx-auto flex w-full flex-row gap-4">
				<motion.div className="flex flex-1 p-5" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, duration: 0.7, ease: "easeOut" }}>
					<div className="flex flex-1 flex-col rounded-2xl bg-white p-4">
						<div className="flex flex-row items-center">
							<img src={Daunesia.src} alt="Logo Daunesia" className="h-12" />
							<div className="text-font-primary mr-4 ml-auto font-medium">
								<p className="hidden lg:inline">{"Sudah punya akun? "}</p>
								<Link href={"/login"} className="text-green-primary hover:underline">
									Masuk
								</Link>
							</div>
						</div>

						<div className="mt-18 flex flex-1 justify-center">
							<div className="flex w-full max-w-lg flex-1 flex-col gap-3">
								<div className="flex flex-col gap-1">
									<motion.div className="text-font-primary text-4xl font-bold">Buat Akun</motion.div>
									<div className="text-md text-font-secondary">Gabung sekarang untuk mendeteksi semua tanaman herbal di Indonesia</div>
								</div>

								<div className="flex w-full flex-col gap-2">
									<div className="text-font-primary text-sm font-medium">Username</div>
									<Input type="text" placeholder="Masukan username kamu" value={username} onChange={(e) => setUsername(e.target.value)} className="placeholder:text-font-secondary border-font-secondary text-font-primary h-10 rounded-lg border-2 bg-white px-4" />
								</div>

								<div className="flex w-full flex-col gap-2">
									<div className="text-font-primary text-sm font-medium">Email</div>
									<Input type="email" placeholder="Masukan email kamu" value={email} onChange={(e) => setEmail(e.target.value)} className="placeholder:text-font-secondary text-font-primary h-10 rounded-lg border-2 border-zinc-800/40 bg-white px-4" />
								</div>

								<div className="flex w-full flex-col gap-2">
									<div className="text-font-primary text-sm font-medium">Password</div>
									<div className="relative">
										<Input type="password" placeholder="Masukan password kamu" value={password} onChange={(e) => setPassword(e.target.value)} className="placeholder:text-font-secondary text-font-primary h-10 rounded-lg border-2 border-zinc-800/40 bg-white px-4" />
										<div className="absolute top-4 right-4">{/* Eye SVG */}</div>
									</div>
								</div>

								<div className="flex w-full flex-col">
									<div className="mt-3 w-full">
										<Button onClick={handleRegister} className="h-12 w-full cursor-pointer rounded-lg font-medium text-white" style={{ background: "linear-gradient(to right, #537D5D, #73946B)" }}>
											Daftar
										</Button>
									</div>
								</div>

								<div className="mt-3 flex items-center gap-6">
									<div className="h-0.5 w-full rounded-lg bg-zinc-300" />
									<div className="text-font-secondary text-base whitespace-nowrap">atau daftar dengan</div>
									<div className="h-0.5 w-full rounded-lg bg-zinc-300" />
								</div>

								<div className="flex w-full flex-col gap-4 lg:flex-row">
									<div
										onClick={async () => {
											await authClient.signIn.social({
												provider: "google",
												callbackURL: "/deteksi",
											});
										}}
										className="flex cursor-pointer h-12 w-full items-center justify-center rounded-lg border-2 border-zinc-800/40 bg-white"
									>
										<div className="mr-2">{/* Google SVG */}</div>
										<div className="text-font-primary font-medium">Google</div>
									</div>
									<div
										onClick={async () => {
											await authClient.signIn.social({
												provider: "facebook",
												callbackURL: "/deteksi",
											});
										}}
										className="flex h-12 w-full items-center justify-center rounded-lg border-2 border-zinc-800/40 bg-white"
									>
										<div className="mr-2">{/* Facebook SVG */}</div>
										<div className="text-font-primary font-medium">Facebook</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</motion.div>

				<motion.div className="-ml-10 hidden w-full max-w-md p-5 lg:flex" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}>
					<Swiper modules={[Autoplay, EffectFade]} effect="fade" loop={true} autoplay={{ delay: 3000, disableOnInteraction: false }} className="h-full w-full rounded-2xl">
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
