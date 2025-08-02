"use client";

import Link from "next/link";
import { Navbar, NavBody, MobileNav, MobileNavHeader, NavbarLogo, MobileNavToggle, MobileNavMenu, NavbarButton } from "./ui/resizable-navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

import Daunesia from "@/assets/icons/logo/LogoDaunesia.png";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const Navbars = () => {
    const [pathname, setPathname] = useState("");
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const p = usePathname();
    const location = { pathname: p };
    const { data } = authClient.useSession();

    useEffect(() => {
        if (location.pathname) {
            setPathname(location.pathname);
        }
    }, [location.pathname]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsProfileDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSignOut = async () => {
        setIsProfileDropdownOpen(false);
        await authClient.signOut();
    };

    // Default avatar jika user tidak punya foto
    const defaultAvatar = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face";

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
                            {data ? (
                                <div className="relative" ref={dropdownRef}>
                                    {/* Profile Button */}
                                    <button
                                        onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <img
                                            src={data.user.image || defaultAvatar}
                                            alt={data.user.name || 'User'}
                                            className="w-8 h-8 rounded-full object-cover border-2 border-green-200"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = defaultAvatar;
                                            }}
                                        />
                                        <div className="hidden md:block text-left">
                                            <p className="text-sm font-medium text-font-primary">
                                                {data.user.name || 'User'}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {data.user.email}
                                            </p>
                                        </div>
                                        <svg
                                            className={`w-4 h-4 text-gray-400 transition-transform ${
                                                isProfileDropdownOpen ? 'rotate-180' : ''
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {/* Dropdown Menu */}
                                    <AnimatePresence>
                                        {isProfileDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
                                            >
                                                {/* User Info Header */}
                                                <div className="px-4 py-3 border-b border-gray-100">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={data.user.image || defaultAvatar}
                                                            alt={data.user.name || 'User'}
                                                            className="w-10 h-10 rounded-full object-cover"
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).src = defaultAvatar;
                                                            }}
                                                        />
                                                        <div>
                                                            <p className="font-medium text-font-primary">
                                                                {data.user.name || 'User'}
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                                {data.user.email}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Menu Items */}
                                                <div className="py-2">
                                                    <Link
                                                        href="/profile"
                                                        onClick={() => setIsProfileDropdownOpen(false)}
                                                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                        Lihat Profil
                                                    </Link>
                                                    
                                                   

                                                    <div className="border-t border-gray-100 my-2"></div>

                                                    <button
                                                        onClick={handleSignOut}
                                                        className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                        </svg>
                                                        Keluar
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <Link className="text-font-primary relative text-base" href={"/login"}>
                                    <p className="relative">Masuk</p>
                                </Link>
                            )}
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
                    
                    {/* Mobile Profile Section */}
                    {data && (
                        <>
                            <div className="border-t border-gray-200 pt-4 mt-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <img
                                        src={data.user.image || defaultAvatar}
                                        alt={data.user.name || 'User'}
                                        className="w-10 h-10 rounded-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = defaultAvatar;
                                        }}
                                    />
                                    <div>
                                        <p className="font-medium text-font-primary">
                                            {data.user.name || 'User'}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {data.user.email}
                                        </p>
                                    </div>
                                </div>
                                <Link 
                                    href="/profile" 
                                    onClick={() => setTimeout(() => setIsMobileMenuOpen(false), 700)} 
                                    className="relative text-neutral-600 dark:text-neutral-300 mb-2 block"
                                >
                                    <span className="block">Profil Saya</span>
                                </Link>
                            </div>
                        </>
                    )}

                    <div className="mt-4 flex w-full flex-col gap-4">
                        {data ? (
                            <NavbarButton 
                                variant="secondary" 
                                className="w-full text-red-600 border-red-200 hover:bg-red-50" 
                                onClick={() => {
                                    setTimeout(() => setIsMobileMenuOpen(false), 700);
                                    handleSignOut();
                                }}
                            >
                                Keluar
                            </NavbarButton>
                        ) : (
                            <Link href="/login">
                                <NavbarButton 
                                    variant="secondary" 
                                    className="w-full" 
                                    onClick={() => setTimeout(() => setIsMobileMenuOpen(false), 700)}
                                >
                                    Masuk
                                </NavbarButton>
                            </Link>
                        )}
                        <Link href="/deteksi">
                            <NavbarButton 
                                variant="primary" 
                                className="bg-green-primary w-full" 
                                onClick={() => setTimeout(() => setIsMobileMenuOpen(false), 700)}
                            >
                                Mulai Sekarang
                            </NavbarButton>
                        </Link>
                    </div>
                </MobileNavMenu>
            </MobileNav>
        </Navbar>
    );
};

export default Navbars;
