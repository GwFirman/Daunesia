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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
      className="mx-auto max-w-screen-xl px-4 md:px-6 py-12 lg:px-8 lg:py-16"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-2.5 text-center"
      >
        <div className="bg-green-second-light text-green-primary inline-flex items-center justify-center rounded-full px-3 py-1 md:px-4 md:py-1">
          <p className="text-sm md:text-lg">Tim Kami</p>
        </div>
        <div className="flex flex-col gap-1">
          <h6 className="text-font-primary text-2xl md:text-3xl font-bold">
            Tim di Balik Layar
          </h6>
          <p className="text-font-primary md:text-lg">
            Orang-orang di balik Daunesia.
          </p>
        </div>
      </motion.div>

      {/* Highlight Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.42, 0, 0.58, 1] }}
        className="mt-10 rounded-lg bg-gradient-to-r from-[#E6E3BD] via-[#C6DBA5] to-[#7BAF84] px-6 py-12 shadow-md"
      >
        <div className="grid grid-cols-1 gap-4 lg:gap-10 md:grid-cols-2 items-center">
          <div className="flex flex-col gap-2 lg:gap-4">
            <h3
              className={`text-xl text-center lg:text-start md:text-2xl font-bold mb-2 ${playwrite.className}`}
            >
              Cara Modern Mengenal Herbal Lokal
            </h3>
            <p className="text-center lg:text-start leading-relaxed">
              Platform kami memberdayakan pengguna untuk menjelajahi tanaman
              herbal asli Indonesia melalui teknologi pengenalan daun berbasis
              AI. Cukup unggah foto untuk mengetahui nama tanaman, manfaat
              tradisional, dan nilai budayanya. Temukan kembali kearifan alam
              satu daun demi satu daun.
            </p>
          </div>
          <blockquote className="bg-white rounded-lg p-6 shadow-md text-center lg:text-start">
            <span className="text-2xl text-green-primary font-bold">“</span>
            Misi kami adalah menghadirkan kembali kearifan herbal Indonesia
            dengan teknologi AI terkini, agar lebih mudah dipelajari, diakses,
            dan diterapkan oleh semua orang.
            <span className="text-2xl text-green-primary font-bold">”</span>
          </blockquote>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.div
        onViewportEnter={() => setIsTeamVisible(true)}
        viewport={{ once: true }}
        className="mt-16 grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {TeamList.map((team, index) => (
          <motion.div
            key={team.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="flex flex-col items-center text-center"
          >
            <img
              src={team.image.src}
              alt={team.name}
              className="mb-4 h-32 w-32 md:h-36 md:w-36 rounded-full object-cover"
            />
            <h3 className="text-font-primary mb-1 text-lg md:text-xl font-bold">
              {team.name}
            </h3>
            <p className="text-font-secondary mb-2 text-md md:text-base">
              {team.role}
            </p>
            <div className="mt-2 flex space-x-4">
              {team.social.github && (
                <a
                  href={team.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-font-primary"
                >
                  <FaGithub size={22} />
                </a>
              )}
              {team.social.instagram && (
                <a
                  href={team.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-font-primary"
                >
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
