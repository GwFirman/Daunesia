import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Daunesia",
	description: "Kenali tumbuh-tumbuhan bermanfaat dari Indonesia, cukup lewat satu foto",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`bg-background font-Helvetica_Neue text-foreground antialiased`}>{children}</body>
		</html>
	);
}
