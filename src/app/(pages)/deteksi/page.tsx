"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import axios from "axios";
import Image from "next/image";
import { getPlantImagesFromTebi } from "@/lib/tebi";

import contohDeteksi from "@/assets/images/contohDeteksi.svg";
import _searchIcons from "@/assets/icons/searchIcons.svg";
import accurationIcons from "@/assets/icons/accurationIcons.svg";
import Contoh1 from "@/assets/images/contoh1.jpg";
import Contoh2 from "@/assets/images/contoh2.jpg";
import Contoh3 from "@/assets/images/contoh3.jpg";


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

const contohImages = [
	{ imgSrc: Contoh1.src, name: "Contoh1.jpg" },
	{ imgSrc: Contoh2.src, name: "Contoh2.jpg" },
	{ imgSrc: Contoh3.src, name: "Contoh3.jpg" }
];

export default function DeteksiPage() {
	const [mounted, setMounted] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
	const [file, setfile] = useState<File | null>(null);
	const [result, setResult] = useState<Result | null>(null);
	const [plantDescription, setPlantDescription] = useState<string>("");
	const [plantName, setPlantName] = useState<string>("");
	const [remainingTrials, setRemainingTrials] = useState<number | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [plantImages, setPlantImages] = useState<string[]>([]);
	const [loadingImages, setLoadingImages] = useState(false);

	async function checkRemainingTrials() {
		try {
			const response = await axios.get<LimitResponse>("/api/deteksi");
			setRemainingTrials(response.data.remaining);
			setIsLoggedIn(response.data.loggedIn);
		} catch (error) {
			console.error("Error checking remaining trials:", error);
		}
	}

	// Function to load plant images when plantName changes
	const loadPlantImages = async (plantName: string) => {
		if (!plantName || plantName === "Gambar tidak terdeteksi sebagai tanaman.") {
			setPlantImages([]);
			return;
		}

		setLoadingImages(true);
		try {
			const images = await getPlantImagesFromTebi(plantName);
			setPlantImages(images);
		} catch (error) {
			console.error("Error loading plant images:", error);
			setPlantImages([]);
		} finally {
			setLoadingImages(false);
		}
	};

	async function mulaiDeteksi(): Promise<any> {
		if (!file) return;

		setIsLoading(true);
		setError(null);
		setUploadProgress(0);
		setPlantImages([]); // Clear previous images

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
				const detectedPlantName = result.data[1] || "";
				const detectedPlantDescription = result.data[2] || "";
				
				setPlantName(detectedPlantName);
				setPlantDescription(detectedPlantDescription);
				
				// Load plant images after setting plant name
				if (detectedPlantName && detectedPlantName !== "Gambar tidak terdeteksi sebagai tanaman.") {
					loadPlantImages(detectedPlantName);
				}
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
		setPlantImages([]); // Clear plant images
		setError(null);
		setUploadProgress(0);
	}

	const handleClickContoh = async (imgSrc: string, name: string) => {
		const response = await fetch(imgSrc);
		const blob = await response.blob();
		const exampleFile = new File([blob], name, { type: blob.type });
		setfile(exampleFile);
	};

	useEffect(() => {
		const timeout = setTimeout(() => setMounted(true), 100); // delay agar tidak abrupt
		// Check remaining trials on component mount
		checkRemainingTrials();
		return () => clearTimeout(timeout);
	}, []);

	return (
		<motion.section initial={{ opacity: 0, y: 40 }} animate={mounted ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }} className="mx-auto max-w-7xl w-full px-4 py-16">
			{/* Header */}
			<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex w-full flex-col items-center gap-3 px-5">
				<div className="flex flex-col gap-1 text-center">
					<h2 className="text-font-primary text-3xl font-bold">Unggah, Kenali, dan Pelajari</h2>
					<p className="text-font-primary max-w-212.5 text-lg">Daunesia membantumu mengenal kekayaan tanaman herbal Indonesia. Unggah foto daun, akar, bunga, atau biji dan sistem kami akan mengenalinya beserta nama lokal dan khasiatnya.</p>
				</div>
			</motion.div>

			{/* Deteksi Section */}
			<motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }} className="mx-auto max-w-7xl flex flex-col-reverse gap-12 p-6 lg:flex-row lg:gap-20 rounded-2xl bg-gradient-to-r from-[#E7F3E7] to-[#B5D6B3] my-12">
				{/* Left Column */}
				<motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex w-full flex-col gap-4 lg:w-2/6">
					<div className="bg-white p-6 rounded-xl shadow-lg">
						{file ? (
							<div className="border-green-primary flex p-2 w-full flex-col items-center justify-center gap-4 rounded-lg border-[2px] border-dashed">
								<Image
									width={320}
									className="object-cover rounded-md max-h-64"
									height={0}
									alt="Gambar yang diunggah"
									src={URL.createObjectURL(file)}
								/>
								<p className="text-green-secondary text-sm font-medium">{file.name}</p>
							</div>
						) : (
							<motion.div
								onDragOver={(e) => {
									e.preventDefault();
									setIsDragging(true);
								}}
								onDragLeave={() => setIsDragging(false)}
								onDrop={(e) => {
									e.preventDefault();
									setIsDragging(false);
									const droppedFile = e.dataTransfer.files?.[0];
									if (droppedFile) {
										if (!droppedFile.type.startsWith("image/")) {
											alert("Hanya file gambar yang diperbolehkan.");
											return;
										}
										if (droppedFile.size > 2 * 1024 * 1024) {
											alert("Ukuran file maksimal 2MB.");
											return;
										}
										setfile(droppedFile);
									}
								}}
								className={`${isDragging ? "border-green-600 bg-green-50" : "border-green-primary"
									} flex h-70 w-full flex-col items-center justify-center gap-4 rounded-lg border-[2px] border-dashed transition-all duration-200`}
							>
								<svg
									width="70"
									height="70"
									viewBox="0 0 98 98"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M10.2084 46.9583V14.2083C10.2084 11.9992 11.9992 10.2083 14.2084 10.2083H83.7917C86.0008 10.2083 87.7917 11.9992 87.7917 14.2083V83.7917C87.7917 86.0008 86.0008 87.7917 83.7917 87.7917H14.2084C11.9992 87.7917 10.2084 86.0008 10.2084 83.7917V63.2917"
										stroke="#537D5D"
										strokeWidth="4.5"
										strokeLinecap="round"
									/>
									<path
										d="M16.3334 53.0833L28.9305 40.4862C29.8129 39.6038 31.2788 39.736 31.9891 40.7619L47.7665 63.5506C48.4312 64.5106 49.7735 64.6995 50.6773 63.9601L70.0575 48.104C70.8528 47.4533 72.0117 47.5111 72.7382 48.2377L87.7917 63.2917"
										stroke="#537D5D"
										strokeWidth="4.5"
										strokeLinecap="round"
									/>
									<circle
										cx="67.375"
										cy="30.625"
										r="6.125"
										fill="#537D5D"
										stroke="#537D5D"
										strokeWidth="4.5"
										strokeLinecap="round"
									/>
								</svg>

								<div className="inline-flex flex-col items-center justify-start">
									<div className="text-green-secondary text-center font-medium">
										Unggah gambar tanaman
									</div>
									<div className="text-center text-green-secondary text-sm">
										Seret atau{" "}
										<label
											htmlFor="file"
											className="font-medium hover:text-green-primary hover:underline transition-colors duration-200 cursor-pointer"
										>
											unggah gambar
										</label>
									</div>
									<input
										onChange={(e) => {
											const selectedFile = e.target.files?.[0];
											if (!selectedFile) return;
											if (!selectedFile.type.startsWith("image/")) {
												alert("Hanya file gambar yang diperbolehkan.");
												return;
											}
											if (selectedFile.size > 2 * 1024 * 1024) {
												alert("Ukuran file maksimal 2MB.");
												return;
											}
											setfile(selectedFile);
										}}
										type="file"
										id="file"
										className="hidden"
										accept="image/*"
									/>
								</div>
							</motion.div>
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
							<button onClick={resetDeteksi} disabled={isLoading} className="cursor-pointer flex-1 flex items-center justify-center gap-2 rounded-full bg-green-secondary px-5 py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-primary transition-colors">
								Bersihkan
							</button>
							<button onClick={mulaiDeteksi} disabled={!file || isLoading || (!isLoggedIn && remainingTrials === 0)} className="flex-1 cursor-pointer flex items-center justify-center gap-2 rounded-full border-2 border-green-secondary bg-white px-5 py-2 text-green-secondary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-50 transition-colors">
								{isLoading ? "Memproses..." : "Mulai Deteksi"}
							</button>
						</div>

						{/* Login Suggestion */}
						{!isLoggedIn && remainingTrials !== null && remainingTrials <= 2 && (
							<div className="mt-3 p-3 bg-green-50 border border-green-light rounded-lg">
								<p className="text-green-primary text-sm text-center">
									💡 <strong>Tips:</strong> Login untuk mendapatkan percobaan tak terbatas dan fitur premium lainnya!
								</p>
							</div>
						)}
					</div>

					<div className="bg-white p-4 rounded-xl shadow-lg">
						<div className="flex flex-col">
							<h6 className="text-sm mb-2">Contoh Tanaman</h6>
							<div className="flex flex-row gap-2">
								{contohImages.map((img, i) => (
									<img
										key={i}
										src={img.imgSrc}
										alt=""
										width={114}
										onClick={() => handleClickContoh(img.imgSrc, img.name)}
										className="cursor-pointer object-cover hover:scale-102 transition-transform rounded-sm"
									/>
								))}
							</div>
						</div>
					</div>


					{/* Label Akurasi, Sisa Percobaan, dan Akses Login */}
					<div className="flex flex-row flex-wrap gap-3">

						{/* Remaining Trials Counter (Non-Logged-in) */}
						{!isLoggedIn && remainingTrials !== null && (
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: 0.3 }}
								className="rounded-lg border-l-4 border-green-secondary bg-white p-3 text-sm shadow-md max-w-max text-center"
							>
								<div className="flex items-center gap-2">
									<svg className="h-5 w-5 text-green-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
									<p className="text-font-primary font-semibold">
										Percobaan Tersisa: {remainingTrials}
									</p>
								</div>

								{remainingTrials === 0 && (
									<p className="text-xs text-red-600">
										Limit tercapai. Silakan login untuk melanjutkan.
									</p>
								)}

								{remainingTrials > 0 && remainingTrials <= 2 && (
									<p className="text-xs text-orange-600">
										Segera login untuk percobaan lebih banyak.
									</p>
								)}
							</motion.div>
						)}

						{/* Logged-in Success Message */}
						{isLoggedIn && (
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: 0.3 }}
								className="rounded-lg border-l-4 border-green-secondary bg-green-50 p-3 text-sm shadow-md max-w-max text-center"
							>
								<div className="flex items-center gap-2">
									<svg className="h-5 w-5 text-green-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
									</svg>
									<p className="text-sm font-semibold text-green-secondary">
										Akses Tidak Terbatas
									</p>
								</div>
							</motion.div>
						)}

						{/* Accuracy Label */}
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="flex items-center gap-2 rounded-lg bg-white p-2 text-sm shadow-md max-w-max text-center"
						>
							<img src={accurationIcons.src} alt="Akurasi" className="h-5 w-5" />
							<p className="text-font-primary font-semibold">98% Akurat.</p>
						</motion.div>


					</div>

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
									{plantName === "Gambar tidak terdeteksi sebagai tanaman." ? (
										// Not a plant detected
										<>
											<div className="border-b pb-4">
												<div className="flex items-center gap-3 mb-3">
													<div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
														<svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
														</svg>
													</div>
													<div>
														<h4 className="text-red-500 text-xl font-bold mb-1">Tanaman Tidak Terdeteksi</h4>
														<p className="text-font-primary text-sm">Sepertinya gambar yang Anda upload bukan tanaman</p>
													</div>
												</div>
											</div>

											<div className="bg-red-50 border border-red-200 rounded-lg p-4">
												<h5 className="text-red-700 font-semibold mb-2">Tips untuk hasil yang lebih baik:</h5>
												<ul className="text-red-600 text-sm space-y-1 list-disc list-inside">
													<li>Pastikan gambar menampilkan daun, bunga, buah, atau bagian tanaman dengan jelas</li>
													<li>Gunakan pencahayaan yang cukup dan fokus yang tajam</li>
													<li>Hindari gambar yang terlalu gelap atau buram</li>
													<li>Coba atur jarak pengambilan foto</li>
												</ul>
											</div>

											<div className="text-center">
												<button
													onClick={resetDeteksi}
													className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-red-500 px-6 py-2 text-white hover:bg-red-600 transition-colors"
												>
													<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
													</svg>
													Coba Lagi
												</button>
											</div>
										</>
									) : (
										// Plant detected
										<>
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

											{/* Plant Images Section */}
											<div className="border-t pt-4">
												<h5 className="text-font-primary font-semibold mb-3">Galeri Tanaman:</h5>
												
												{loadingImages ? (
													<div className="flex items-center justify-center py-8">
														<div className="flex items-center gap-2">
															<div className="w-4 h-4 border-2 border-green-secondary border-t-transparent rounded-full animate-spin"></div>
															<span className="text-green-secondary text-sm">Memuat gambar tanaman...</span>
														</div>
													</div>
												) : plantImages.length > 0 ? (
													<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
														{plantImages.map((imageUrl, index) => (
															<motion.div
																key={index}
																initial={{ opacity: 0, scale: 0.9 }}
																animate={{ opacity: 1, scale: 1 }}
																transition={{ duration: 0.3, delay: index * 0.1 }}
																className="relative group cursor-pointer"
															>
																<img
																	src={imageUrl}
																	alt={`${plantName} - Gambar ${index + 1}`}
																	className="w-full h-32 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-200"
																	onClick={() => {
																		// Optional: Open image in modal/lightbox
																		window.open(imageUrl, '_blank');
																	}}
																/>
																<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-200"></div>
															</motion.div>
														))}
													</div>
												) : (
													<div className="text-center py-6 bg-gray-50 rounded-lg">
														<svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
														</svg>
														<p className="text-gray-500 text-sm">Gambar tanaman tidak tersedia</p>
													</div>
												)}
											</div>
										</>
									)}
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</motion.section>
	);
}
