import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Outlet } from "react-router";

export default function _app() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="bg-background font-inter text-foreground flex min-h-screen flex-col antialiased">
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </ThemeProvider>
    );
}
