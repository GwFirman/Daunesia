"use client";

import Link from "next/link";
import { Navbar, NavBody, MobileNav, MobileNavHeader, NavbarLogo, MobileNavToggle, MobileNavMenu, NavbarButton } from "./ui/resizable-navbar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import Daunesia from "@/assets/icons/logo/LogoDaunesia.png";
import { usePathname } from "next/navigation";

const Navbars = () => {
	const [pathname, setPathname] = useState("");

	const p = usePathname();
	const location = { pathname: p };

	useEffect(() => {
		if (location.pathname) {
			setPathname(location.pathname);
		}
	}, [location.pathname]);

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<Navbar>
			<NavBody>
				<div className="relative w-screen">
					<div className="mx-auto flex max-w-7xl flex-row items-center justify-between">
						<Link href={"/"} className="flex items-center">
							<img src={Daunesia.src} alt="Logo Daunesia" className="h-8" />
						</Link>
						<div className="text-font-primary flex flex-row items-center justify-center space-x-12">
							<motion.div layout onHoverStart={() => setPathname("/")} onHoverEnd={() => setPathname(location.pathname)}>
								<Link className="relative" href={"/"}>
									<p className="relative">Beranda</p>
									{pathname === "/" && <motion.div layoutId="navbar-2" className="absolute h-[1.8px] w-full rounded-md bg-black" initial={{ scaleX: 0.5 }} animate={{ scaleX: 1, opacity: 1 }} exit={{ scaleX: 0.5 }} transition={{ duration: 1, ease: [0.42, 0, 0.58, 1], type: "spring" }} />}
								</Link>
							</motion.div>
							<motion.div layout onHoverStart={() => setPathname("/tentang-kami")} onHoverEnd={() => setPathname(location.pathname)}>
								<Link className="relative" href={"/tentang-kami"}>
									<p className="relative">Tentang Kami</p>
									{pathname === "/tentang-kami" && <motion.div layoutId="navbar-2" className="absolute h-[1.8px] w-full rounded-md bg-black" transition={{ type: "spring", duration: 1 }} />}
								</Link>
							</motion.div>
							<motion.div layout onHoverStart={() => setPathname("/deteksi")} onHoverEnd={() => setPathname(location.pathname)}>
								<Link className="relative" href={"/deteksi"}>
									<p className="relative">Deteksi</p>
									{pathname === "/deteksi" && <motion.div layoutId="navbar-2" className="absolute h-[1.8px] w-full rounded-md bg-black" transition={{ type: "spring", duration: 1 }} />}
								</Link>
							</motion.div>
						</div>
						<div />
						<div />
						<div />
						<div className="flex items-center gap-4">
							<Link className="text-font-primary relative text-base" href={"/login"}>
								<p className="relative">Masuk</p>
							</Link>
							<Link className="bg-green-primary flex h-10 items-center rounded-xl px-5.5 font-medium text-white" href={"/deteksi"}>
								Mulai Sekarang
							</Link>
						</div>
					</div>
				</div>
			</NavBody>

			<MobileNav>
				<MobileNavHeader>
					<NavbarLogo />
					<MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
				</MobileNavHeader>

				<MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
					<Link href="/" onClick={() => setTimeout(() => setIsMobileMenuOpen(false), 700)} className="relative text-neutral-600 dark:text-neutral-300">
						<span className="block">Beranda</span>
						{location.pathname === "/" && <motion.div layoutId="mobile-navbar-indicator" className="absolute h-[1.8px] w-full rounded-md bg-black" initial={{ scaleX: 0.5 }} animate={{ scaleX: 1, opacity: 1 }} exit={{ scaleX: 0.5 }} transition={{ duration: 1, ease: [0.42, 0, 0.58, 1], type: "spring" }} />}
					</Link>
					<Link href="/tentang-kami" onClick={() => setTimeout(() => setIsMobileMenuOpen(false), 700)} className="relative text-neutral-600 dark:text-neutral-300">
						<span className="block">Tentang Kami</span>
						{location.pathname === "/tentang-kami" && <motion.div layoutId="mobile-navbar-indicator" className="absolute h-[1.8px] w-full rounded-md bg-black" transition={{ type: "spring", duration: 1 }} />}
					</Link>
					<Link href="/deteksi" onClick={() => setTimeout(() => setIsMobileMenuOpen(false), 700)} className="relative text-neutral-600 dark:text-neutral-300">
						<span className="block">Deteksi</span>
						{location.pathname === "/deteksi" && <motion.div layoutId="mobile-navbar-indicator" className="absolute h-[1.8px] w-full rounded-md bg-black" transition={{ type: "spring", duration: 1 }} />}
					</Link>
					<div className="mt-4 flex w-full flex-col gap-4">
						<NavbarButton variant="secondary" className="w-full" onClick={() => setTimeout(() => setIsMobileMenuOpen(false), 700)}>
							Masuk
						</NavbarButton>
						<NavbarButton variant="primary" className="bg-green-primary w-full" onClick={() => setTimeout(() => setIsMobileMenuOpen(false), 700)}>
							Mulai Sekarang
						</NavbarButton>
					</div>
				</MobileNavMenu>
			</MobileNav>
		</Navbar>
	);
};

export default Navbars;
