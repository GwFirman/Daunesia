import image_home from "@/assets/images/image_home.png";
import sereh from "@/assets/images/sereh.png";

export default function Home() {
    return (
        <>
            <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-12 px-4 py-12">
                <div className="flex flex-1 flex-col-reverse items-center justify-center gap-8 lg:flex-row lg:justify-between">
                    <div className="flex w-full max-w-lg flex-col gap-6">
                        <p className="text-4xl font-bold">Discover local herbs through computer vision.</p>
                        <p className="text-xl">Daunesia helps you identify Indonesian herbal plants using AI.</p>

                        <div className="flex w-full max-w-sm flex-col gap-4 lg:flex-row">
                            <div className="inline-flex h-10 items-center justify-center rounded-2xl bg-linear-225 from-[#537d5d] to-[#73946b] px-4">
                                <div className="justify-center text-center leading-tight font-medium text-white">Get Started</div>
                            </div>
                            <div className="inline-flex h-10 items-center justify-center gap-[5px] rounded-2xl bg-white px-4 outline-2 outline-offset-[-1px] outline-[#537d5d]">
                                <div className="justify-center text-center leading-tight font-medium text-[#537d5d]">Explore Now</div>
                                <div data-svg-wrapper className="relative">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M17.9471 3.71403C18.4638 3.62212 19.1596 3.59094 19.7225 4.06559L19.8329 4.16716L19.9344 4.27751C20.4091 4.84041 20.3779 5.53627 20.286 6.0529C20.1867 6.61108 19.9486 7.31606 19.6835 8.11149L17.5204 14.6017C17.2518 15.4076 17.038 16.0494 16.8514 16.5275C16.6782 16.9716 16.4724 17.4321 16.163 17.7541C14.9825 18.9824 13.0172 18.9824 11.8368 17.7541C11.5274 17.4321 11.3216 16.9716 11.1483 16.5275C10.9618 16.0494 10.748 15.4076 10.4794 14.6017C10.3592 14.2411 10.3321 14.1692 10.3026 14.1134C10.2088 13.9362 10.0638 13.7912 9.8866 13.6974C9.8308 13.6679 9.75911 13.6409 9.39832 13.5207C8.59237 13.252 7.95066 13.0383 7.47253 12.8517C7.02841 12.6784 6.56801 12.4727 6.24597 12.1632C5.01757 10.9828 5.01766 9.01757 6.24597 7.83708C6.56799 7.52768 7.02843 7.32188 7.47253 7.1486C7.95064 6.96207 8.59242 6.74829 9.39832 6.47966L15.8885 4.31657C16.684 4.05142 17.389 3.81337 17.9471 3.71403ZM18.2977 5.68376C17.9188 5.75118 17.3814 5.92734 16.5214 6.21403L10.0302 8.37712C9.2029 8.65287 8.61896 8.84807 8.1991 9.01188C7.99159 9.09285 7.84649 9.15807 7.74597 9.2111C7.67424 9.24898 7.64118 9.2724 7.63171 9.27946C7.22247 9.67295 7.22239 10.3274 7.63171 10.7209C7.64121 10.728 7.67419 10.7513 7.74597 10.7892C7.84651 10.8423 7.99153 10.9075 8.1991 10.9884C8.61897 11.1523 9.20284 11.3474 10.0302 11.6232C10.327 11.7222 10.5852 11.8041 10.8212 11.9289C11.3536 12.2105 11.7896 12.6464 12.0712 13.1789C12.1959 13.4148 12.2779 13.673 12.3768 13.9699C12.6526 14.7972 12.8478 15.3811 13.0116 15.8009C13.0926 16.0085 13.1578 16.1535 13.2108 16.2541C13.2487 16.3258 13.2721 16.3589 13.2792 16.3683C13.6726 16.7776 14.3271 16.7776 14.7206 16.3683C14.7276 16.3589 14.7511 16.3258 14.7889 16.2541C14.842 16.1536 14.9072 16.0084 14.9882 15.8009C15.152 15.3811 15.3472 14.7971 15.6229 13.9699L17.786 7.47868C18.0727 6.61866 18.2489 6.08121 18.3163 5.70231C18.3176 5.69514 18.3171 5.68766 18.3182 5.68083C18.3116 5.68194 18.3046 5.68253 18.2977 5.68376Z"
                                            fill="url(#paint0_linear_48_48)"
                                        />
                                        <defs>
                                            <linearGradient id="paint0_linear_48_48" x1="20.3413" y1="18.6755" x2="3.30633" y2="15.8567" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#537D5D" />
                                                <stop offset="1" stop-color="#73946B" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <img src={image_home} className="w-full max-w-sm lg:max-w-xl" alt="" />
                    </div>
                </div>

                <div className="flex h-72 flex-col items-center justify-center gap-4 rounded-2xl border-[3px] border-dashed border-[#537d5d] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]">
                    <svg width="98" height="98" viewBox="0 0 98 98" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.2084 46.9583V14.2083C10.2084 11.9992 11.9992 10.2083 14.2084 10.2083H83.7917C86.0008 10.2083 87.7917 11.9992 87.7917 14.2083V83.7917C87.7917 86.0008 86.0008 87.7917 83.7917 87.7917H14.2084C11.9992 87.7917 10.2084 86.0008 10.2084 83.7917V63.2917" stroke="#537D5D" stroke-width="4.5" stroke-linecap="round" />
                        <path d="M16.3334 53.0833L28.9305 40.4862C29.8129 39.6038 31.2788 39.736 31.9891 40.7619L47.7665 63.5506C48.4312 64.5106 49.7735 64.6995 50.6773 63.9601L70.0575 48.104C70.8528 47.4533 72.0117 47.5111 72.7382 48.2377L87.7917 63.2917" stroke="#537D5D" stroke-width="4.5" stroke-linecap="round" />
                        <circle cx="67.375" cy="30.625" r="6.125" fill="#537D5D" stroke="#537D5D" stroke-width="4.5" stroke-linecap="round" />
                    </svg>

                    <div className="inline-flex flex-col items-start justify-start">
                        <div className="flex flex-col items-center justify-start self-stretch">
                            <div className="justify-center text-center leading-tight font-medium text-[#73946b]">Upload a plant image</div>
                        </div>
                        <div className="flex flex-col items-center justify-start self-stretch">
                            <div className="justify-center text-center">
                                <span className="text-sm leading-none font-normal text-[#73946b]">Drag & drop or </span>
                                <span className="text-sm leading-none font-extrabold text-[#73946b]">click to browse</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/*  */}
                <div className="flex flex-col items-center gap-8">
                    <div className="inline-flex w-fit items-center justify-center rounded-2xl bg-[#9ebc8a]/60 px-4 py-2 text-[#537d5d]">
                        <p className="text-lg">Showcase</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="text-center text-3xl font-bold text-[#2a2a2a]">Explore Common Herbal Plants</div>

                        <div className="text-center text-lg font-normal text-[#2a2a2a]">Here are a few examples of leaves you can scan with Daunesia.</div>
                    </div>

                    <div className="flex w-full flex-row gap-4">
                        <div className="flex max-w-96 flex-col gap-4 rounded-[10px] bg-neutral-100 p-4 shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]">
                            <img src={sereh} alt="" className="rounded-2xl" />
                            <div className="justify-start text-center font-['Helvetica_Neue'] text-lg font-medium text-[#2a2a2a]">Sereh</div>
                        </div>

                        <div className="flex w-full flex-col">
                            <div className="flex flex-row gap-2">
                                {["#DigestiveAid", "#AntiBacterial", "#StressRelief", "#Aromatherapy"].map((v, i) => {
                                    return (
                                        <div key={i} className="rounded-[50px] bg-[#9ebc8a]/60 px-3 py-1">
                                            <p className="text sm text-[#537d5d]">{v}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
