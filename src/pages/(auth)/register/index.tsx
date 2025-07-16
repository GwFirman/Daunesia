import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

import image_login from "@/assets/images/image_login.png";
import Daunesia from "@/assets/icons/logo/LogoDaunesia.svg";

export default function Register() {
    return (
        <div className="flex h-screen max-w-screen bg-neutral-100">
            <div className="max-w-8xl mx-auto flex w-full flex-row gap-4">
                {/* Left Panel */}
                <div className="flex flex-1 p-5">
                    <div className="flex flex-1 flex-col rounded-2xl bg-white p-4">
                        <div className="flex items-center flex-row">
                            <img src={Daunesia} alt="Logo Daunesia" className="h-12" />

                            <div className="text-font-primary mr-4 ml-auto font-medium">
                                <p className="hidden lg:inline">{"Sudah punya akun? "}</p>
                                <Link to={"/login"} className="text-green-primary hover:underline">
                                    Masuk
                                </Link>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-1 justify-center">
                            <div className="flex w-full max-w-lg flex-1 flex-col gap-3">
                                {/* Header */}
                                <div className="flex flex-col gap-1">
                                    <div className="text-font-primary text-4xl font-bold">Buat Akun</div>
                                    <div className="text-md text-font-secondary">Gabung sekarang untuk mendeteksi semua tanaman herbal di Indonesia</div>
                                </div>

                                <div className="flex w-full flex-col gap-2">
                                    <div className="text-font-primary text-sm font-medium">Username</div>
                                    <Input type="text" placeholder="Masukan username kamu" className="placeholder:text-font-secondary border-font-secondary text-font-primary h-10 rounded-lg border-2 bg-white px-4" />
                                </div>

                                {/* Email Input */}
                                <div className="flex w-full flex-col gap-2">
                                    <div className="text-font-primary text-sm font-medium">Email</div>
                                    <Input type="email" placeholder="Masukan email kamu" className="placeholder:text-font-secondary text-font-primary h-10 rounded-lg border-2 border-zinc-800/40 bg-white px-4" />
                                </div>

                                {/* Password Input */}
                                <div className="flex w-full flex-col gap-2">
                                    <div className="text-font-primary text-sm font-medium">Password</div>
                                    <div className="relative">
                                        <Input type="password" placeholder="Masukan password kamu" className="placeholder:text-font-secondary text-font-primary h-10 rounded-lg border-2 border-zinc-800/40 bg-white px-4" />
                                        <div className="absolute top-4 right-4">{/* Eye SVG */}</div>
                                    </div>
                                </div>

                                {/* Login Button */}
                                <div className="flex w-full flex-col">
                                    <div className="mt-3 w-full">
                                        <Button className="h-12 w-full cursor-pointer rounded-lg font-medium text-white" style={{ background: "linear-gradient(to right, #537D5D, #73946B)" }}>
                                            Daftar
                                        </Button>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="mt-3 flex items-center gap-6">
                                    <div className="h-0.5 w-full rounded-lg bg-zinc-300" />
                                    <div className="text-font-secondary text-base whitespace-nowrap">atau daftar dengan</div>
                                    <div className="h-0.5 w-full rounded-lg bg-zinc-300" />
                                </div>

                                {/* Social Buttons */}
                                <div className="flex w-full flex-col gap-4 lg:flex-row">
                                    <div className="flex h-12 w-full items-center justify-center rounded-lg border-2 border-zinc-800/40 bg-white">
                                        <div className="mr-2">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_82_48)">
                                                    <path d="M11.9998 9.81815V14.4654H18.458C18.1744 15.96 17.3234 17.2255 16.047 18.0764L19.9416 21.0982C22.2107 19.0037 23.5198 15.9273 23.5198 12.2728C23.5198 11.4219 23.4434 10.6037 23.3015 9.81828L11.9998 9.81815Z" fill="#4285F4" />
                                                    <path d="M5.27468 14.284L4.39631 14.9564L1.28717 17.3782C3.26171 21.2945 7.30868 24 11.9996 24C15.2395 24 17.9558 22.9309 19.9413 21.0982L16.0468 18.0764C14.9777 18.7964 13.614 19.2328 11.9996 19.2328C8.87957 19.2328 6.22874 17.1273 5.27958 14.291L5.27468 14.284Z" fill="#34A853" />
                                                    <path d="M1.28718 6.62183C0.469042 8.23631 0 10.0581 0 11.9999C0 13.9417 0.469042 15.7636 1.28718 17.378C1.28718 17.3889 5.27997 14.2799 5.27997 14.2799C5.03998 13.5599 4.89812 12.7963 4.89812 11.9998C4.89812 11.2033 5.03998 10.4398 5.27997 9.71976L1.28718 6.62183Z" fill="#FBBC05" />
                                                    <path d="M11.9998 4.77818C13.7671 4.77818 15.338 5.38907 16.5925 6.56727L20.0289 3.13095C17.9452 1.18917 15.2398 0 11.9998 0C7.30893 0 3.26171 2.69454 1.28717 6.62183L5.27984 9.72001C6.22888 6.88362 8.87982 4.77818 11.9998 4.77818Z" fill="#EA4335" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_82_48">
                                                        <rect width="24" height="24" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                        <div className="text-font-primary font-medium">Google</div>
                                    </div>
                                    <div className="flex h-12 w-full items-center justify-center rounded-lg border-2 border-zinc-800/40 bg-white">
                                        <div className="mr-2">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_83_56)">
                                                    <path
                                                        d="M24 12C24 5.37264 18.6274 0 12 0C5.37264 0 0 5.37264 0 12C0 17.6275 3.87456 22.3498 9.10128 23.6467V15.6672H6.62688V12H9.10128V10.4198C9.10128 6.33552 10.9498 4.4424 14.9597 4.4424C15.72 4.4424 17.0318 4.59168 17.5685 4.74048V8.06448C17.2853 8.03472 16.7933 8.01984 16.1822 8.01984C14.2147 8.01984 13.4544 8.76528 13.4544 10.703V12H17.3741L16.7006 15.6672H13.4544V23.9122C19.3963 23.1946 24.0005 18.1354 24.0005 12H24Z"
                                                        fill="#0866FF"
                                                    />
                                                    <path
                                                        d="M16.7002 15.6672L17.3736 12H13.4539V10.7031C13.4539 8.76529 14.2142 8.01985 16.1818 8.01985C16.7928 8.01985 17.2848 8.03473 17.568 8.06449V4.74049C17.0314 4.59121 15.7195 4.44241 14.9592 4.44241C10.9493 4.44241 9.1008 6.33553 9.1008 10.4199V12H6.6264V15.6672H9.1008V23.6467C10.0291 23.8771 11.0002 24 11.9995 24C12.4915 24 12.9768 23.9698 13.4534 23.9122V15.6672H16.6997H16.7002Z"
                                                        fill="white"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_83_56">
                                                        <rect width="24" height="24" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                        <div className="text-font-primary font-medium">Facebook</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="-ml-10 hidden w-full max-w-md p-5 lg:flex">
                    <img className="flex-1 rounded-xl object-cover" src={image_login} alt="Login Illustration" />
                </div>
            </div>
        </div>
    );
}
