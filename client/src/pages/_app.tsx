import { ThemeProvider } from "@/components/theme-provider";
import { Outlet } from "react-router";

export default function _app() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<div className="bg-background text-foreground antialiased flex flex-col min-h-screen">
				<Outlet />
			</div>
		</ThemeProvider>
	);
}
