import { Outlet } from "react-router";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function _layout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}
