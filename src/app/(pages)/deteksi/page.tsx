"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import contohDeteksi from "@/assets/images/contohDeteksi.svg";
import _searchIcons from "@/assets/icons/searchIcons.svg";
import accurationIcons from "@/assets/icons/accurationIcons.svg";
import axios from "axios";
import Image from "next/image";

export interface ApiResponse {
	success: boolean;
	result: Result;
}

export interface LimitResponse {
	loggedIn: boolean;
	remaining: number;
}

export interface ErrorResponse {
	error: string;
}

export interface Result {
	type: string;
	time: string;
	data: [Data, string, string];
	endpoint: string;
	fn_index: number;
}

export interface Data {
	label: string;
	confidences: Confidence[];
}

export interface Confidence {
	label: string;
	confidence: number;
}

export default function DeteksiPage() {
	const [mounted, setMounted] = useState(false);
	const [file, setfile] = useState<File | null>(null);
	const [result, setResult] = useState<Result | null>(null);
	const [plantDescription, setPlantDescription] = useState<string>("");
	const [plantName, setPlantName] = useState<string>("");
	const [remainingTrials, setRemainingTrials] = useState<number | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function checkRemainingTrials() {
		try {
			const response = await axios.get<LimitResponse>("/api/deteksi");
			setRemainingTrials(response.data.remaining);
			setIsLoggedIn(response.data.loggedIn);
		} catch (error) {
			console.error("Error checking remaining trials:", error);
		}
	}

	async function mulaiDeteksi(): Promise<any> {
		if (!file) return;

		setIsLoading(true);
		setError(null);
		setUploadProgress(0);

		const formData = new FormData();
		formData.append("file", file);

		try {
			const response = await axios.post<ApiResponse>("/api/deteksi", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
				onUploadProgress: (progressEvent) => {
					if (progressEvent.total) {
						const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
						setUploadProgress(percent);
						console.log(`📶 Progress: ${percent}%`);
					}
				},
			});

			if (!response.data || !response.data.success || !response.data.result) {
				throw new Error("Tidak ada data yang diterima dari server");
			}

			const result = response.data.result;
			setResult(result);

			// Extract plant name and description from the data array
			if (result.data && result.data.length >= 3) {
				setPlantName(result.data[1] || "");
				setPlantDescription(result.data[2] || "");
			}
		} catch (error) {
			console.error("Error saat deteksi:", error);

			// Handle specific error cases
			if (error instanceof Error) {
				setError(error.message);
			} else if (axios.isAxiosError(error) && error.response) {
				if (error.response.status === 429) {
					const errorData = error.response.data as ErrorResponse;
					setError(errorData.error || "Limit percobaan tercapai. Silakan login untuk melanjutkan.");
				} else {
					setError("Terjadi kesalahan saat mendeteksi tanaman");
				}
			} else {
				setError("Terjadi kesalahan saat mendeteksi tanaman");
			}
		} finally {
			setIsLoading(false);
			setUploadProgress(0);
			// Refresh remaining trials after detection attempt
			checkRemainingTrials();
		}
	}

	function resetDeteksi() {
		setfile(null);
		setResult(null);
		setPlantName("");
		setPlantDescription("");
		setError(null);
		setUploadProgress(0);
	}

	useEffect(() => {
		const timeout = setTimeout(() => setMounted(true), 100); // delay agar tidak abrupt
		// Check remaining trials on component mount
		checkRemainingTrials();
		return () => clearTimeout(timeout);
	}, []);

	return (
		<motion.div initial={{ opacity: 0, y: 40 }} animate={mounted ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }} className="mx-auto max-w-7xl w-full px-4 py-16">
			{/* Header */}
			<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex w-full flex-col items-center gap-3 px-5">
				<div className="flex flex-col gap-1 text-center">
					<h2 className="text-font-primary text-3xl font-bold">Unggah, Kenali, dan Pelajari</h2>
					<p className="text-font-primary max-w-212.5 text-lg">Daunesia membantumu mengenal kekayaan tanaman herbal Indonesia. Unggah foto daun, akar, bunga, atau biji dan sistem kami akan mengenalinya beserta nama lokal dan khasiatnya.</p>
				</div>
			</motion.div>

			{/* Deteksi Section */}
			<motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }} className="mx-auto max-w-7xl flex flex-col-reverse gap-12 p-6 lg:flex-row lg:gap-20 rounded-2xl bg-gradient-to-r from-[#E7F3E7] to-[#B5D6B3] my-12">
				{/* Left Column */}
				<motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex w-full flex-col gap-4 lg:w-2/6">
					<div className="bg-white p-6 rounded-xl shadow-lg">
						{file ? (
							<div className="border-green-primary flex p-2 w-full flex-col items-center justify-center gap-4 rounded-lg border-[2px] border-dashed">
								<Image width={320} className="object-cover rounded-md max-h-64" height={0} alt="Gambar yang diunggah" src={URL.createObjectURL(file)} />
								<p className="text-green-secondary text-sm font-medium">{file.name}</p>
							</div>
						) : (
							<motion.label htmlFor="file" className="border-green-primary flex h-70 w-full flex-col items-center justify-center gap-4 rounded-lg border-[2px] border-dashed cursor-pointer hover:border-green-secondary transition-colors">
								<svg width="70" height="70" viewBox="0 0 98 98" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M10.2084 46.9583V14.2083C10.2084 11.9992 11.9992 10.2083 14.2084 10.2083H83.7917C86.0008 10.2083 87.7917 11.9992 87.7917 14.2083V83.7917C87.7917 86.0008 86.0008 87.7917 83.7917 87.7917H14.2084C11.9992 87.7917 10.2084 86.0008 10.2084 83.7917V63.2917" stroke="#537D5D" strokeWidth="4.5" strokeLinecap="round" />
									<path d="M16.3334 53.0833L28.9305 40.4862C29.8129 39.6038 31.2788 39.736 31.9891 40.7619L47.7665 63.5506C48.4312 64.5106 49.7735 64.6995 50.6773 63.9601L70.0575 48.104C70.8528 47.4533 72.0117 47.5111 72.7382 48.2377L87.7917 63.2917" stroke="#537D5D" strokeWidth="4.5" strokeLinecap="round" />
									<circle cx="67.375" cy="30.625" r="6.125" fill="#537D5D" stroke="#537D5D" strokeWidth="4.5" strokeLinecap="round" />
								</svg>
								<div className="inline-flex flex-col items-start justify-start">
									<div className="flex flex-col items-center justify-start self-stretch">
										<input onChange={(e) => e.target.files?.[0] && setfile(e.target.files[0])} type="file" id="file" className="hidden" accept="image/*" />
										<div className="text-green-secondary justify-center text-center leading-tight font-medium">Unggah gambar tanaman</div>
									</div>
									<div className="flex flex-col items-center justify-start self-stretch">
										<div className="justify-center text-center">
											<span className="text-green-secondary text-sm leading-none font-normal">Seret atau </span>
											<span className="text-green-secondary text-sm leading-none font-bold">unggah gambar</span>
										</div>
									</div>
								</div>
							</motion.label>
						)}

						{/* Progress Bar */}
						{isLoading && (
							<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
								<div className="w-full bg-gray-200 rounded-full h-2">
									<div className="bg-green-secondary h-2 rounded-full transition-all duration-300" style={{ width: `${uploadProgress === 100 ? 100 : uploadProgress}%` }}></div>
								</div>
								<p className="text-green-secondary text-sm mt-2 text-center">{uploadProgress === 100 ? "Sedang memproses gambar..." : uploadProgress > 0 ? `Mengunggah... ${uploadProgress}%` : "Memproses gambar..."}</p>
							</motion.div>
						)}

						{/* Error Message */}
						{error && (
							<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg">
								<p className="text-red-600 text-sm">{error}</p>
							</motion.div>
						)}

						{/* Buttons */}
						<div className="flex gap-2 mt-4">
							<button onClick={resetDeteksi} disabled={isLoading} className="cursor-pointer flex-1 flex items-center justify-center gap-2 rounded-full bg-green-secondary px-5 py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-600 transition-colors">
								Bersihkan
							</button>
							<button onClick={mulaiDeteksi} disabled={!file || isLoading || (!isLoggedIn && remainingTrials === 0)} className="flex-1 cursor-pointer flex items-center justify-center gap-2 rounded-full border-2 border-green-secondary bg-white px-5 py-2 text-green-secondary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-50 transition-colors">
								{isLoading ? "Memproses..." : "Mulai Deteksi"}
							</button>
						</div>

						{/* Login Suggestion */}
						{!isLoggedIn && remainingTrials !== null && remainingTrials <= 2 && (
							<div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
								<p className="text-blue-700 text-sm text-center">
									💡 <strong>Tips:</strong> Login untuk mendapatkan percobaan tak terbatas dan fitur premium lainnya!
								</p>
							</div>
						)}
					</div>

					{/* Accuracy Label */}
					<motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="text-center max-w-max text-sm bg-white p-2 rounded-lg shadow-md flex items-center gap-2">
						<img src={accurationIcons.src} alt="Akurasi" className="h-5 w-5" />
						<p className="text-font-primary text-sm font-semibold">98% Akurat.</p>
					</motion.div>

					{/* Remaining Trials Counter */}
					{!isLoggedIn && remainingTrials !== null && (
						<motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="text-center max-w-max text-sm bg-white p-3 rounded-lg shadow-md border-l-4 border-green-secondary">
							<div className="flex items-center gap-2 mb-1">
								<svg className="w-4 h-4 text-green-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<p className="text-font-primary text-sm font-semibold">Percobaan Tersisa: {remainingTrials}</p>
							</div>
							{remainingTrials === 0 && <p className="text-red-600 text-xs">Limit tercapai. Silakan login untuk melanjutkan.</p>}
							{remainingTrials > 0 && remainingTrials <= 2 && <p className="text-orange-600 text-xs">Segera login untuk percobaan lebih banyak.</p>}
						</motion.div>
					)}

					{/* Login Prompt for Unlimited Access */}
					{isLoggedIn && (
						<motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="text-center max-w-max text-sm bg-green-50 p-3 rounded-lg shadow-md border-l-4 border-green-secondary">
							<div className="flex items-center gap-2">
								<svg className="w-4 h-4 text-green-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
								</svg>
								<p className="text-green-secondary text-sm font-semibold">Akses Tidak Terbatas</p>
							</div>
						</motion.div>
					)}
				</motion.div>

				{/* Right Column */}
				<AnimatePresence mode="wait">
					{!result && (
						<motion.div key="default-content" exit={{ opacity: 0, y: 30 }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="flex w-full flex-col gap-4 lg:w-5/8">
							<h3 className="text-font-primary text-2xl font-bold">Tanaman Herbal yang Dapat Dikenali</h3>
							<Image width={768} src={contohDeteksi.src} alt="Contoh tanaman herbal yang dapat dikenali" height={0} />
						</motion.div>
					)}
					{result && (
						<motion.div key="result-content" exit={{ opacity: 0, y: 30 }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex w-full flex-col gap-4 lg:w-5/8">
							<h3 className="text-font-primary text-2xl font-bold">Hasil Deteksi</h3>
							<div className="bg-white p-6 rounded-xl shadow-lg">
								<div className="flex flex-col gap-4">
									<div className="border-b pb-4">
										<h4 className="text-green-secondary text-xl font-bold mb-2">{plantName || result.data[0]?.label || "Tanaman Terdeteksi"}</h4>
										<p className="text-font-primary text-sm">Tanaman berhasil diidentifikasi dengan tingkat kepercayaan tinggi</p>
									</div>

									<div className="space-y-3">
										<h5 className="text-font-primary font-semibold">Tingkat Kepercayaan:</h5>
										{result.data[0]?.confidences?.map((confidence, index) => (
											<div key={index} className="flex items-center justify-between">
												<span className="text-font-primary text-sm">{confidence.label}</span>
												<div className="flex items-center gap-2">
													<div className="w-24 bg-gray-200 rounded-full h-2">
														<div className="bg-green-secondary h-2 rounded-full transition-all duration-300" style={{ width: `${confidence.confidence * 100}%` }}></div>
													</div>
													<span className="text-green-secondary text-sm font-medium">{(confidence.confidence * 100).toFixed(1)}%</span>
												</div>
											</div>
										))}
									</div>

									{/* Plant Description */}
									{plantDescription && (
										<div className="border-t pt-4">
											<h5 className="text-font-primary font-semibold mb-3">Deskripsi & Manfaat:</h5>
											<div className="prose prose-sm max-w-none">
												<div
													className="text-font-primary text-sm leading-relaxed whitespace-pre-wrap"
													dangerouslySetInnerHTML={{
														__html: plantDescription.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>"),
													}}
												/>
											</div>
										</div>
									)}
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.section>
		</motion.div>
	);
}
