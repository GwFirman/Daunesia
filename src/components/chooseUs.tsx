"use client";

import { motion } from "framer-motion";

import chooseUsImg from "@/assets/images/chooseUs.png";
import Link from "next/link";

const chooseUs = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 md:py-16">
      <div className="flex flex-col-reverse items-center gap-12 lg:flex-row lg:items-start lg:justify-between">
        {/* Left Section */}
        <div className="-mt-3 flex w-full justify-center lg:max-w-md">
          <motion.img
            src={chooseUsImg.src}
            alt="Steps"
            className="hidden lg:block w-full max-w-xl"
            draggable={false}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1], delay: 0.3 }}
          />
        </div>

        {/* Right Section */}
        <div className="flex w-full flex-col gap-2.5 lg:w-2/4">
          {/* Tagline label */}
          <div className="flex justify-end lg:justify-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
              className="bg-green-second-light text-green-primary inline-flex max-w-max items-center justify-center rounded-full px-3 py-1 md:px-4 md:py-1"
            >
              <p className="text-sm md:text-lg">Pilih Daunesia</p>
            </motion.div>
          </div>

          {/* Judul dan deskripsi singkat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.42, 0, 0.58, 1] }}
            className="flex flex-col gap-1 items-end lg:items-start text-end lg:text-start max-w-2xl self-end lg:self-start"
          >
            <div className="text-font-primary text-2xl md:text-3xl font-bold">
              Mulailah Petualangan Herbalmu Hari Ini
            </div>
            <p className="text-font-primary text-base md:text-lg">
              Bergabunglah bersama ribuan orang yang belajar mengenal tanaman
              herbal Indonesia lewat Daunesia.
            </p>
          </motion.div>

          {/* Paragraf panjang */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.42, 0, 0.58, 1] }}
            className="text-font-secondary leading-snug flex flex-col gap-4 text-end lg:text-start max-w-2xl self-end lg:self-start"
          >
            <p>
              Indonesia kaya akan tanaman obat, namun banyak dari kita belum
              mengenalnya baik nama maupun manfaatnya. Dengan Daunesia, kamu
              bisa mulai mengenali tanaman herbal cukup dengan mengunggah foto.
              Temukan khasiatnya, pelajari penggunaannya dalam tradisi, dan ikut
              melestarikan kearifan lokal satu daun dalam satu langkah.
            </p>
          </motion.div>

          {/* Tombol */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.42, 0, 0.58, 1] }}
            className="mt-2.5 flex justify-end lg:justify-start"
          >
            <Link
              href="/deteksi"
              className="inline-block rounded-full px-3 py-2 md:px-4 md:py-2 lg:px-6 lg:py-3 md:font-medium text-white"
              style={{
                background: "linear-gradient(to right, #537D5D, #73946B)",
              }}
            >
              Coba Deteksi Sekarang
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default chooseUs;
