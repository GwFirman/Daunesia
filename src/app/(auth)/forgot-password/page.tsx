"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";

import "swiper/css";
import "swiper/css/effect-fade";

import Daunesia from "@/assets/icons/logo/LogoDaunesia.png";
import carousel1 from "@/assets/images/crousel1.png";
import carousel2 from "@/assets/images/crousel2.png";
import carousel3 from "@/assets/images/crousel3.png";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";

const carouselData = [{ image: carousel1 }, { image: carousel2 }, { image: carousel3 }];

export default function ForgotPasswordPage() {
	// --- STATE UNTUK KEDUA SKENARIO ---
	const [view, setView] = useState<"request" | "reset">("request"); // Mengontrol tampilan form
	const [token, setToken] = useState<string | null>(null);

	// State untuk form 'request'
	const [email, setEmail] = useState("");

	// State untuk form 'reset'
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	// State untuk feedback & loading
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	// --- LOGIKA UTAMA: CEK TOKEN DI URL SAAT HALAMAN DIBUKA ---
	useEffect(() => {
		const urlToken = new URLSearchParams(window.location.search).get("token");
		if (urlToken) {
			setToken(urlToken);
			setView("reset"); // Jika ada token, ubah tampilan ke form reset
		}
	}, []); // Hanya dijalankan sekali saat komponen dimuat

	// --- FUNGSI #1: MEMINTA EMAIL RESET ---
	const handleRequestReset = async () => {
		if (!email) {
			setError("Email wajib diisi.");
			return;
		}
		setIsLoading(true);
		setError("");
		setMessage("");

		try {
			// URL ini adalah halaman ini sendiri, agar pengguna kembali ke sini dengan token
			const redirectTo = window.location.href.split("?")[0];
			const { error } = await authClient.requestPasswordReset({ email, redirectTo });

			if (error) {
				setError(error.message || "Gagal mengirim email. Pastikan email benar.");
			} else {
				setMessage("Email reset telah dikirim! Silakan periksa kotak masuk Anda.");
			}
		} catch (err) {
			setError("Terjadi kesalahan pada server.");
		} finally {
			setIsLoading(false);
		}
	};

	// --- FUNGSI #2: MENGUBAH PASSWORD DENGAN TOKEN ---
	const handlePerformReset = async () => {
		if (!password || !confirmPassword) {
			setError("Semua kolom password wajib diisi.");
			return;
		}
		if (password !== confirmPassword) {
			setError("Password dan konfirmasi tidak cocok.");
			return;
		}
		if (!token) {
			setError("Tautan tidak valid.");
			return;
		}

		setIsLoading(true);
		setError("");
		setMessage("");

		try {
			const { error } = await authClient.resetPassword({ newPassword: password, token });

			if (error) {
				setError(error.message || "Gagal mengubah password. Token mungkin tidak valid atau sudah kedaluwarsa.");
			} else {
				setMessage("Password berhasil diubah! Anda akan diarahkan ke halaman login...");
				setTimeout(() => router.push("/login"), 3000);
			}
		} catch (err) {
			setError("Terjadi kesalahan pada server.");
		} finally {
			setIsLoading(false);
		}
	};

	const { data } = authClient.useSession();
	if (data) {
		redirect("/");
	}

	return (
		<motion.div className="flex h-screen max-w-screen bg-neutral-100" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}>
			<div className="max-w-8xl mx-auto flex w-full flex-row gap-4">
				<motion.div className="flex flex-1 p-5" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, duration: 0.7, ease: "easeOut" }}>
					<div className="flex flex-1 flex-col rounded-2xl bg-white p-4">
						<Link href="/" className="flex flex-row items-center m-2 w-fit">
							<motion.img animate={{ opacity: [0, 1] }} transition={{ duration: 1.2 }} src={Daunesia.src} alt="Logo Daunesia" className="h-8 " />
						</Link>

						<div className="mt-18 flex flex-1 justify-center">
							<div className="flex w-full max-w-lg flex-1 flex-col gap-3">
								{/* --- TAMPILAN FORM DINAMIS BERDASARKAN 'view' --- */}

								{view === "request" && (
									<>
										<div className="flex flex-col gap-1">
											<motion.div className="text-font-primary text-4xl font-bold">Lupa Password?</motion.div>
											<div className="text-md text-font-secondary">Jangan khawatir! Masukkan email untuk atur ulang kata sandi kamu.</div>
										</div>
										{error && <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}
										{message && <div className="p-3 text-sm text-green-700 bg-green-100 rounded-lg">{message}</div>}
										<div className="flex w-full flex-col gap-2 mt-4">
											<div className="text-font-primary text-sm font-medium">Email</div>
											<Input type="email" placeholder="Masukkan email terdaftar kamu" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading || !!message} className="placeholder:text-font-secondary text-font-primary h-10 rounded-lg border-2 border-zinc-800/40 bg-white px-4" />
										</div>
										<div className="mt-3 w-full">
											<Button onClick={handleRequestReset} disabled={isLoading || !!message} className="h-12 w-full cursor-pointer rounded-lg font-medium text-white disabled:opacity-50" style={{ background: "linear-gradient(to right, #537D5D, #73946B)" }}>
												{isLoading ? "Mengirim..." : "Kirim Email Reset"}
											</Button>
										</div>
									</>
								)}

								{view === "reset" && (
									<>
										<div className="flex flex-col gap-1">
											<motion.div className="text-font-primary text-4xl font-bold">Atur Ulang Password</motion.div>
											<div className="text-md text-font-secondary">Silakan masukkan password baru Anda di bawah ini.</div>
										</div>
										{error && <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}
										{message && <div className="p-3 text-sm text-green-700 bg-green-100 rounded-lg">{message}</div>}
										<div className="flex w-full flex-col gap-4 mt-4">
											<div className="flex w-full flex-col gap-2">
												<div className="text-font-primary text-sm font-medium">Password Baru</div>
												<Input type="password" placeholder="Masukan password baru kamu" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading || !!message} className="placeholder:text-font-secondary text-font-primary h-10 rounded-lg border-2 border-zinc-800/40 bg-white px-4" />
											</div>
											<div className="flex w-full flex-col gap-2">
												<div className="text-font-primary text-sm font-medium">Konfirmasi Password Baru</div>
												<Input type="password" placeholder="Konfirmasi password baru kamu" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={isLoading || !!message} className="placeholder:text-font-secondary text-font-primary h-10 rounded-lg border-2 border-zinc-800/40 bg-white px-4" />
											</div>
										</div>
										<div className="mt-3 w-full">
											<Button onClick={handlePerformReset} disabled={isLoading || !!message} className="h-12 w-full cursor-pointer rounded-lg font-medium text-white disabled:opacity-50" style={{ background: "linear-gradient(to right, #537D5D, #73946B)" }}>
												{isLoading ? "Memproses..." : "Ubah Password"}
											</Button>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</motion.div>

				{/* Bagian Carousel tidak diubah sama sekali */}
				<motion.div className="-ml-10 hidden w-full max-w-md p-5 lg:flex" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}>
					<Swiper modules={[Autoplay, EffectFade]} effect="fade" loop={true} autoplay={{ delay: 3000, disableOnInteraction: false }} className="h-full w-full rounded-2xl">
						{carouselData.map((slide, idx) => (
							<SwiperSlide key={idx}>
								<div className="relative h-full w-full">
									<img src={slide.image.src} className="h-full w-full scale-105 object-cover transition-transform duration-1000 ease-in-out" style={{ filter: "brightness(0.85)" }} alt={`Carousel ${idx + 1}`} />
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</motion.div>
			</div>
		</motion.div>
	);
}
