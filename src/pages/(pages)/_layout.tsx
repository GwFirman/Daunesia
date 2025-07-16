import { Outlet } from "react-router";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function _layout() {
    return (
        <main className="flex min-h-screen flex-col">
            <Navbar />
            <Outlet />
            <Footer />
        </main>
    );
}
