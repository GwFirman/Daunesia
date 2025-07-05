import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
    return (
        <div className="w-full border-b">
            <div className="mx-auto flex h-16 max-w-7xl flex-row items-center p-4">
                <div>
                    <p className="text-xl font-semibold">DETEKSI TANAMAN HERBAL</p>
                </div>
                <div className="ml-auto">
                    <ModeToggle />
                </div>
            </div>
        </div>
    );
}
