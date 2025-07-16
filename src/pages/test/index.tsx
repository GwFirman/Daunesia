import { motion } from "framer-motion";

export default function Page() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-md p-[1px]">
                <motion.div initial={{ rotate: 0 }} animate={{ rotate: -360 }} transition={{ repeat: Infinity, ease: "linear", duration: 3.1 }} className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-conic from-red-500 to-transparent to-10%" />
                <motion.div className="relative h-full w-full rounded-md bg-blue-500" />
            </div>
        </div>
    );
}
