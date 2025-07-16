import { Link, useLocation } from "react-router";
import { Navbar, NavBody } from "./ui/resizable-navbar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import Daunesia from "@/assets/icons/logo/LogoDaunesia.png";

const Navbars = () => {
    const [pathname, setPathname] = useState("");

    const location = useLocation();

    useEffect(() => {
        if (location.pathname) {
            setPathname(location.pathname);
        }
    }, [location.pathname]);

    return (
        <Navbar>
            <NavBody>
                <div className="relative w-screen">
                    <div className="mx-auto flex max-w-7xl flex-row items-center justify-between">
                        <Link to={"/"} className="flex items-center">
                            <img src={Daunesia} alt="Logo Daunesia" className="h-8" />
                        </Link>
                        <div className="text-font-primary flex flex-row items-center justify-center space-x-12">
                            <motion.div layout onHoverStart={() => setPathname("/")} onHoverEnd={() => setPathname(location.pathname)}>
                                <Link className="relative" to={"/"}>
                                    <p className="relative">Beranda</p>
                                    {pathname === "/" && <motion.div layoutId="navbar-2" className="absolute h-[1.8px] w-full rounded-md bg-black" initial={{ scaleX: 0.5 }} animate={{ scaleX: 1, opacity: 1 }} exit={{ scaleX: 0.5 }} transition={{ duration: 1, ease: [0.42, 0, 0.58, 1], type: "spring" }} />}
                                </Link>
                            </motion.div>
                            <motion.div layout onHoverStart={() => setPathname("/tentang-kami")} onHoverEnd={() => setPathname(location.pathname)}>
                                <Link className="relative" to={"/tentang-kami"}>
                                    <p className="relative">Tentang Kami</p>
                                    {pathname === "/tentang-kami" && <motion.div layoutId="navbar-2" className="absolute h-[1.8px] w-full rounded-md bg-black" transition={{ type: "spring", duration: 1 }} />}
                                </Link>
                            </motion.div>
                            <motion.div layout onHoverStart={() => setPathname("/deteksi")} onHoverEnd={() => setPathname(location.pathname)}>
                                <Link className="relative" to={"/deteksi"}>
                                    <p className="relative">Deteksi</p>
                                    {pathname === "/deteksi" && <motion.div layoutId="navbar-2" className="absolute h-[1.8px] w-full rounded-md bg-black" transition={{ type: "spring", duration: 1 }} />}
                                </Link>
                            </motion.div>
                        </div>
                        <div />
                        <div />
                        <div />
                        <div className="flex items-center gap-4">
                            <Link className="text-font-primary relative text-base" to={"/login"}>
                                <p className="relative">Masuk</p>
                            </Link>
                            <Link className="bg-green-primary flex h-10 items-center rounded-xl px-5.5 font-medium text-white" to={"/deteksi"}>
                                Mulai Sekarang
                            </Link>
                        </div>
                    </div>
                </div>
            </NavBody>
        </Navbar>
    );
};

export default Navbars;
