import Daunesia from "@/assets/icons/logo/LogoDaunesia.svg";
import { Link } from "react-router";

const Navbar = () => {
    return (
        <div className="w-full border-b ">
            <div className="mx-auto flex h-18 max-w-7xl flex-row items-center p-4">
                <Link to={"/"} className="mr-24 flex items-center">
                    <img src={Daunesia} alt="Logo Daunesia" className="h-14" />
                </Link>
                <nav className="flex flex-1 items-center">
                    <ul className="text-font-primary flex space-x-16 text-base">
                        <li>
                            <Link className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full" to={"/"}>
                                Beranda
                            </Link>
                        </li>
                        <li>
                            <Link className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full" to={"/tentang-kami"}>
                                Tentang Kami
                            </Link>
                        </li>
                        <li>
                            <Link className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full" to={"/deteksi"}>
                                Deteksi
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="flex ml-auto gap-4 items-center">
                    <Link className="text-font-primary text-base" to={"/login"}>
                        Masuk
                    </Link>
                    <Link className="inline-block rounded-lg bg-green-primary px-5.5 py-2.5 font-medium text-white" to={"/deteksi"}>
                        Mulai Sekarang
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;