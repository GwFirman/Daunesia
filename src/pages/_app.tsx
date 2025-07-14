// import Footer from "@/components/footer";
// import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Outlet } from "react-router";

export default function _app() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="bg-background font-Helvetica_Neue text-foreground antialiased">
                {/* <Navbar /> */}
                <Outlet />
                {/* <Footer /> */}
            </div>
        </ThemeProvider>
    );
}
