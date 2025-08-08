"use client";

import Link from "next/link";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { AnimatePresence, motion } from "framer-motion";
// import { CardContainer } from "./ui/3d-card";

import image_home from "@/assets/images/image_home.png";
import { useEffect, useState } from "react";
import { useImage } from "@/contexts/imageContext";
import { useRouter } from "next/navigation";

const Hero = () => {
  const { image, setImage } = useImage();
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setImage(null);
  }, []);

  // File validation function
  const validateFile = (file: File): boolean => {
    if (!file.type.startsWith("image/")) {
      alert("Hanya file gambar yang diperbolehkan.");
      return false;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran file maksimal 2MB.");
      return false;
    }
    return true;
  };

  // Handle file selection
  const handleFileSelect = (file: File | null) => {
    if (file && validateFile(file)) {
      setImage(file);
    }
  };

  return (
    <motion.section
      layoutId="layout"
      className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-12 px-5 py-12 lg:py-16"
    >
      <div className="flex flex-1 flex-col-reverse items-center justify-center gap-8 lg:flex-row lg:justify-between">
        <div className="relative -mt-3 lg:mt-8 flex w-full md:max-w-2xl lg:max-w-lg flex-col gap-4">
          <TextGenerateEffect
            duration={0.7}
            words="Kenali tumbuh-tumbuhan bermanfaat dari Indonesia, cukup lewat satu foto."
            className="text-font-primary text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-center lg:text-start"
          />
          <motion.p
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 1.3,
              duration: 1.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="text-font-primary text-lg md:text-xl text-center lg:text-start font-light"
          >
            Dengan teknologi AI, Daunesia membantumu mengidentifikasi berbagai
            tanaman herbal lokal Indonesia.
          </motion.p>
          <motion.div
            layout
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 1.7,
              duration: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="relative flex w-full flex-col items-center lg:items-start"
          >
            <div className="flex items-center justify-center lg:justify-start w-full max-w-sm">
              <div
                className="flex md:h-12 items-center justify-center rounded-full px-4 py-2 md:px-6 md:py-4"
                style={{
                  background: "linear-gradient(to right, #537D5D, #73946B)",
                }}
              >
                <Link
                  href={"/deteksi"}
                  className="text-center md:font-medium text-white"
                >
                  Mulai Sekarang
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="lg:mt-12">
          <motion.img
            initial={{ y: 70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1.2, ease: [0.42, 0, 0.58, 1] }}
            src={image_home.src}
            className="w-full sm:max-w-sm md:max-w-lg"
            alt=""
          />
        </div>
      </div>

      <input
        id="gambar"
        type="file"
        onChange={(e) => handleFileSelect(e.target.files ? e.target.files?.[0] : null)}
        className="hidden"
        accept="image/*"
      />

      {/* <CardContainer className="w-full"> */}
      <AnimatePresence>
        {!image ? (
          <>
            <motion.label
              htmlFor="gambar"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 2.1,
                duration: 1.2,
                ease: [0.42, 0, 0.58, 1],
              }}
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
                  handleFileSelect(droppedFile);
                }
              }}
              className={`border-green-primary lg:mt-12 flex h-70 w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-[3px] border-dashed shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] ${
                isDragging ? "border-green-600 bg-green-50" : ""
              } transition-all duration-200`}
            >
              <svg
                width="80"
                height="80"
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

              <div className="inline-flex flex-col items-start justify-start">
                <div className="flex flex-col items-center justify-start self-stretch">
                  <div className="text-green-secondary justify-center text-center leading-tight font-medium">
                    Unggah gambar tanaman
                  </div>
                </div>
                <div className="flex flex-col items-center justify-start self-stretch">
                  <div className="justify-center text-center px-4">
                    <span className="text-green-secondary text-sm leading-none font-normal">
                      Seret gambar ke sini atau{" "}
                    </span>
                    <span className="text-green-secondary text-sm leading-none font-bold">
                      klik untuk unggah dari perangkat
                    </span>
                  </div>
                </div>
              </div>
            </motion.label>
          </>
        ) : (
          <>
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.42, 0, 0.58, 1] }}
              className="mt-12 flex h-70 w-full flex-col items-center justify-center"
            >
              <div className="relative h-full w-full">
                <motion.img
                  layoutId="image1"
                  src={URL.createObjectURL(image)}
                  alt={`Pratinjau ${image.name}`}
                  onLoad={(e) => {
                    URL.revokeObjectURL(e.currentTarget.src);
                    router.push("/deteksi");
                  }}
                  className="h-full w-full rounded-2xl object-cover shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
                />
                <button
                  onClick={() => setImage(null)}
                  className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-red-600/75"
                  aria-label="Hapus gambar"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-green-secondary mt-2 w-full truncate text-center text-sm font-medium">
                {image.name}
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* </CardContainer> */}
    </motion.section>
  );
};

export default Hero;
