"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function Layout(props: { children: ReactNode }) {
	const pathname = usePathname();
	const showFooter = pathname !== "/profile";

	return (
		<main className="flex min-h-screen flex-col">
			<Navbar />
			{props.children}
			{showFooter && <Footer />}
		</main>
	);
}
