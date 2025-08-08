"use client";

import Hero from "@/components/hero";
import ExampleDetection from "@/components/ExampleDetection";
import Steps from "@/components/Step";
import Feature from "@/components/Ourfeature";
import ChooseUs from "@/components/chooseUs";

export default function HomePage() {
	return (
		<>
			<Hero />
			<ExampleDetection />
			<Steps />
			<Feature />
			<ChooseUs />
		</>
	);
}
