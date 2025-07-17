"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ReactNode } from "react";

export default function Layout(props: { children: ReactNode }) {
	return (
		<main className="flex min-h-screen flex-col">
			<Navbar />
			{props.children}
			<Footer />
		</main>
	);
}
