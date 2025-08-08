"use client";

import Link from "next/link";
import {
  Navbar,
  NavBody,
  MobileNav,
  MobileNavHeader,
  NavbarLogo,
  MobileNavToggle,
  MobileNavMenu,
  NavbarButton,
} from "./ui/resizable-navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

import Daunesia from "@/assets/icons/logo/LogoDaunesia.png";
import LogoutIllustration from "@/assets/images/logout.png"; // Import logout illustration
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const Navbars = () => {
  const [pathname, setPathname] = useState("");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false); // Add state for logout confirmation
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
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Show logout confirmation instead of immediately signing out
  const handleLogoutClick = () => {
    setIsProfileDropdownOpen(false);
    setShowLogoutConfirmation(true);
  };

  // Actual sign out function to be called after confirmation
  const handleSignOut = async () => {
    setShowLogoutConfirmation(false);
    await authClient.signOut();
  };

  // Default avatar - host secara lokal di public folder
  const defaultAvatar = "/images/default-avatar.png";

  // Fungsi helper untuk proxy image
  const getProxiedImageUrl = (originalUrl: string | null) => {
    if (!originalUrl) return defaultAvatar;
    return `/api/avatar?url=${encodeURIComponent(originalUrl)}`;
  };

  // Fungsi helper untuk mendapatkan avatar URL
  const getAvatarUrl = (originalUrl: string | null, name: string = "User") => {
    if (!originalUrl) {
      // Generate avatar dari nama user dengan UI Avatars API
      const formattedName = encodeURIComponent(name.replace(/\s+/g, "+"));
      return `https://ui-avatars.com/api/?name=${formattedName}&background=73946B&color=ffffff&size=200`;
    }

    // Gunakan proxy untuk external images (Gmail dll)
    return `/api/avatar?url=${encodeURIComponent(originalUrl)}`;
  };

  return (
    <>
      <Navbar>
        <NavBody>
          <div className="relative w-screen">
            <div className="mx-auto flex max-w-7xl w-full items-center justify-between">
              {/* Bagian KIRI: Logo + Navigasi */}
              <div className="flex items-center gap-10">
                {/* Logo */}
                <Link href={"/"} className="flex items-center">
                  <img src={Daunesia.src} alt="Logo Daunesia" className="h-8" />
                </Link>

                {/* Navigasi */}
                <div className="text-font-primary hidden md:flex flex-row items-center space-x-12">
                  <motion.div
                    layout
                    onHoverStart={() => setPathname("/")}
                    onHoverEnd={() => setPathname(location.pathname)}
                  >
                    <Link className="relative" href={"/"}>
                      <p className="relative">Beranda</p>
                      {pathname === "/" && (
                        <motion.div
                          layoutId="navbar-2"
                          className="absolute h-[1.8px] w-full rounded-md bg-black"
                          initial={{ scaleX: 0.5 }}
                          animate={{ scaleX: 1, opacity: 1 }}
                          exit={{ scaleX: 0.5 }}
                          transition={{
                            duration: 1,
                            ease: [0.42, 0, 0.58, 1],
                            type: "spring",
                          }}
                        />
                      )}
                    </Link>
                  </motion.div>
                  <motion.div
                    layout
                    onHoverStart={() => setPathname("/tentang-kami")}
                    onHoverEnd={() => setPathname(location.pathname)}
                  >
                    <Link className="relative" href={"/tentang-kami"}>
                      <p className="relative">Tentang Kami</p>
                      {pathname === "/tentang-kami" && (
                        <motion.div
                          layoutId="navbar-2"
                          className="absolute h-[1.8px] w-full rounded-md bg-black"
                          transition={{ type: "spring", duration: 1 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                  <motion.div
                    layout
                    onHoverStart={() => setPathname("/deteksi")}
                    onHoverEnd={() => setPathname(location.pathname)}
                  >
                    <Link className="relative" href={"/deteksi"}>
                      <p className="relative">Deteksi</p>
                      {pathname === "/deteksi" && (
                        <motion.div
                          layoutId="navbar-2"
                          className="absolute h-[1.8px] w-full rounded-md bg-black"
                          transition={{ type: "spring", duration: 1 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                </div>
              </div>

              {/* Bagian KANAN: CTA + Profile/Login */}
              <div className="flex items-center gap-4">
                {data ? (
                  <div
                    onMouseEnter={() => setIsProfileDropdownOpen(true)}
                    onMouseLeave={() => setIsProfileDropdownOpen(false)}
                    className="relative flex items-center p-2 rounded-lg cursor-pointer"
                  >
                    <img
                      src={getAvatarUrl(data?.user?.image ?? null, data?.user?.name)}
                      alt={data.user.name || "User"}
                      className="w-10 h-10 rounded-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/default-avatar.png";
                      }}
                    />
                    <AnimatePresence>
                      {isProfileDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 top-13 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
                        >
                          <div className="px-4 py-3 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                              <img
                                src={getAvatarUrl(data?.user?.image ?? null, data?.user?.name)} // ✅ Gunakan proxy di sini juga
                                alt={data.user.name || "User"}
                                className="w-10 h-10 rounded-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = defaultAvatar;
                                }}
                              />
                              <div>
                                <p className="font-medium text-font-primary">
                                  {data.user.name || "User"}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {data.user.email}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="py-2">
                            <Link
                              href="/profile"
                              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                              Lihat Profil
                            </Link>
                            <div className="border-t border-gray-100 my-2"></div>
                            <button
                              onClick={handleLogoutClick} 

                              className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                              </svg>
                              Keluar
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="rounded-xl border border-green-primary px-4 py-1.5 text-green-primary hover:bg-green-50 transition-colors"
                  >
                    Masuk
                  </Link>
                )}
                <Link
                  href="/deteksi"
                  className="bg-green-primary flex h-10 items-center rounded-xl px-5.5 font-medium text-white"
                >
                  {data ? "Deteksi Sekarang" : "Mulai Sekarang"}
                </Link>
              </div>
            </div>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            <Link
              href="/"
              onClick={() => setTimeout(() => setIsMobileMenuOpen(false), 700)}
              className="relative text-neutral-600 dark:text-neutral-300"
            >
              <span className="block">Beranda</span>
              {location.pathname === "/" && (
                <motion.div
                  layoutId="mobile-navbar-indicator"
                  className="absolute h-[1.8px] w-full rounded-md bg-black"
                  initial={{ scaleX: 0.5 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  exit={{ scaleX: 0.5 }}
                  transition={{
                    duration: 1,
                    ease: [0.42, 0, 0.58, 1],
                    type: "spring",
                  }}
                />
              )}
            </Link>
            <Link
              href="/tentang-kami"
              onClick={() => setTimeout(() => setIsMobileMenuOpen(false), 700)}
              className="relative text-neutral-600 dark:text-neutral-300"
            >
              <span className="block">Tentang Kami</span>
              {location.pathname === "/tentang-kami" && (
                <motion.div
                  layoutId="mobile-navbar-indicator"
                  className="absolute h-[1.8px] w-full rounded-md bg-black"
                  transition={{ type: "spring", duration: 1 }}
                />
              )}
            </Link>
            <Link
              href="/deteksi"
              onClick={() => setTimeout(() => setIsMobileMenuOpen(false), 700)}
              className="relative text-neutral-600 dark:text-neutral-300"
            >
              <span className="block">Deteksi</span>
              {location.pathname === "/deteksi" && (
                <motion.div
                  layoutId="mobile-navbar-indicator"
                  className="absolute h-[1.8px] w-full rounded-md bg-black"
                  transition={{ type: "spring", duration: 1 }}
                />
              )}
            </Link>

            {/* Mobile Profile Section */}
            {data && (
              <>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <Link
                    href="/profile"
                    onClick={() =>
                      setTimeout(() => setIsMobileMenuOpen(false), 700)
                    }
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
                    handleLogoutClick(); // Updated to show confirmation
                  }}
                >
                  Keluar
                </NavbarButton>
              ) : (
                <Link
                  href="/login"
                  onClick={() =>
                    setTimeout(() => setIsMobileMenuOpen(false), 700)
                  }
                >
                  <NavbarButton
                    variant="secondary"
                    className="w-full border border-green-primary text-green-primary hover:bg-green-50"
                  >
                    Masuk
                  </NavbarButton>
                </Link>
              )}
              <Link href="/deteksi">
                <NavbarButton
                  variant="primary"
                  className="bg-green-primary w-full text-white"
                  onClick={() =>
                    setTimeout(() => setIsMobileMenuOpen(false), 700)
                  }
                >
                  {data ? "Deteksi Sekarang" : "Mulai Sekarang"}
                </NavbarButton>
              </Link>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirmation && (
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 "
            >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 md:p-8"
            >
              <div className="text-center">
              <div className="flex justify-center mb-4">
                <img
                src={LogoutIllustration.src}
                alt="Logout Confirmation"
                className="h-48 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-font-primary mb-2">
                Anda yakin ingin keluar?
              </h3>
              <p className="text-gray-600 mb-6">
                Anda perlu masuk kembali untuk mengakses akun dan fitur keren lainnya.
              </p>
              <div className="flex flex-col-reverse md:flex-row gap-3 justify-center">
                <button
                onClick={() => setShowLogoutConfirmation(false)}
                className="px-6 py-2.5 border border-gray-300 rounded-full text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                Batal
                </button>
                <button
                onClick={handleSignOut}
                className="px-6 py-2.5 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-colors"
                >
                Ya, Keluar
                </button>
              </div>
              </div>
            </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbars;
