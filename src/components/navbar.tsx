import Daunesia from "@/assets/logo/LogoDaunesia.png";
import { Link, useLocation } from "react-router";
import { Navbar, NavBody } from "./ui/resizable-navbar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navbarss() {
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
                                    {pathname === "/" && <motion.div layoutId="navbar-2" className="absolute h-[1.8px] w-full rounded-md bg-black" transition={{ type: "spring", duration: 1 }} />}
                                </Link>
                            </motion.div>
                            <motion.div layout onHoverStart={() => setPathname("/tentangkami")} onHoverEnd={() => setPathname(location.pathname)}>
                                <Link className="relative" to={"/tentangkami"}>
                                    <p className="relative">Tentang Kami</p>
                                    {pathname === "/tentangkami" && <motion.div layoutId="navbar-2" className="absolute h-[1.8px] w-full rounded-md bg-black" transition={{ type: "spring", duration: 1 }} />}
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
                            {/* <Link className="text-font-primary text-base" to={"/login"}>
                                Masuk
                            </Link> */}
                            <Link className="bg-green-primary flex h-10 items-center rounded-lg px-5.5 font-medium text-white" to={"/deteksi"}>
                                Mulai Sekarang
                            </Link>
                        </div>
                    </div>
                </div>
            </NavBody>
        </Navbar>
    );
}
