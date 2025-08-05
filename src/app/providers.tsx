"use client";

import { ImageProvider } from "@/contexts/imageContext";
import React, { ReactNode } from "react";

export default function Providers(props: { children: ReactNode }) {
	return (
		<ImageProvider>
			<>{props.children}</>
		</ImageProvider>
	);
}
