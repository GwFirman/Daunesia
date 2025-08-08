import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
	title: "Daunesia",
	description: "Kenali tumbuh-tumbuhan bermanfaat dari Indonesia, cukup lewat satu foto",
	icons: {
		icon: [
			{
				url: "/favicon.ico",
				// Add a cache busting parameter with current timestamp
				href: `/favicon.ico?v=${Date.now()}`,
			},
		],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<Providers>
				<body className={`bg-background font-Helvetica_Neue text-foreground antialiased`}>{children}</body>
			</Providers>
		</html>
	);
}
