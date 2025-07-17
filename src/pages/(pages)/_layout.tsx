import { Outlet, ScrollRestoration } from "react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function _layout() {
    return (
        <main className="flex min-h-screen flex-col">
            <Navbar />
            <ScrollRestoration />
            <Outlet />
            <Footer />
        </main>
    );
}
