"use client";

import { motion, useInView } from "framer-motion";
import { ReactFlow, type Node, type Edge, addEdge, type Connection, useNodesState, useEdgesState, Position, Handle } from "@xyflow/react";
import { useCallback, useEffect, useRef, useState } from "react";

import "@xyflow/react/dist/style.css";
import sirih from "@/assets/images/sirih.png";

// Custom node untuk annotation point
const AnnotationNode = ({ data }: { data: any }) => {
	return (
		<div className="relative">
			<div className="h-4 w-4 cursor-pointer rounded-full border-2 border-white bg-green-700 shadow-md transition-colors">
				<Handle
					type="source"
					position={Position.Right}
					style={{
						background: "transparent",
						border: "none",
						width: "100%",
						height: "100%",
						position: "absolute",
						top: 0,
						left: 0,
					}}
				/>
			</div>
			{data.label && <div className="absolute -top-8 left-1/2 -translate-x-1/2 transform rounded bg-black px-2 py-1 text-xs whitespace-nowrap text-white">{data.label}</div>}
		</div>
	);
};

// Custom node untuk info panel
const InfoNode = ({ data }: { data: any }) => {
	return (
		<div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-3 shadow-md sm:max-w-md sm:p-4 md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl">
			<Handle
				type="target"
				position={Position.Left}
				style={{
					background: "#22c55e",
					border: "2px solid white",
					width: "12px",
					height: "12px",
				}}
			/>
			<div className="flex flex-row items-center gap-2">
				{data.id == "point1" && (
					<svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M2.33398 10.5C2.33398 13.5942 3.56315 16.5617 5.75107 18.7496C7.939 20.9375 10.9065 22.1667 14.0007 22.1667C17.0948 22.1667 20.0623 20.9375 22.2502 18.7496C24.4382 16.5617 25.6673 13.5942 25.6673 10.5" stroke="#73946B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M25.6673 10.5C22.5731 10.5 19.6057 11.7292 17.4177 13.9171C15.2298 16.105 14.0007 19.0725 14.0007 22.1667C14.0007 20.6346 13.6989 19.1175 13.1126 17.702C12.5263 16.2866 11.6669 15.0004 10.5836 13.9171C9.50021 12.8337 8.21409 11.9744 6.79862 11.3881C5.38316 10.8018 3.86607 10.5 2.33398 10.5" stroke="#73946B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M17.4888 13.4165C17.5699 11.7931 17.3002 10.1712 16.6983 8.66131C16.0964 7.15141 15.1762 5.7889 14.0005 4.6665C12.8247 5.7889 11.9046 7.15141 11.3026 8.66131C10.7007 10.1712 10.4311 11.7931 10.5121 13.4165" stroke="#73946B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				)}
				{data.id == "point2" && (
					<svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M27.0841 5.23816C27.0716 5.02409 26.9809 4.82207 26.8293 4.67045C26.6776 4.51883 26.4756 4.42816 26.2616 4.41566C20.6003 4.08753 16.0547 5.80909 14.1012 9.03347C12.8106 11.1652 12.8128 13.7541 14.0837 16.2238C13.3602 17.0849 12.8315 18.0923 12.5339 19.1769L10.7544 17.3908C11.6097 15.6047 11.5769 13.7432 10.645 12.1966C9.20124 9.81331 5.86859 8.53581 1.73093 8.77863C1.51687 8.79113 1.31485 8.8818 1.16322 9.03342C1.0116 9.18504 0.920931 9.38706 0.90843 9.60113C0.664524 13.7388 1.94312 17.0714 4.3264 18.5152C5.11283 18.9958 6.01661 19.2501 6.93827 19.2502C7.83284 19.2391 8.71349 19.0272 9.51515 18.63L12.2495 21.3644V24.5002C12.2495 24.7323 12.3417 24.9548 12.5058 25.1189C12.6699 25.283 12.8925 25.3752 13.1245 25.3752C13.3566 25.3752 13.5791 25.283 13.7432 25.1189C13.9073 24.9548 13.9995 24.7323 13.9995 24.5002V21.2747C13.9955 19.8827 14.4693 18.5314 15.3416 17.4466C16.467 18.0348 17.7151 18.3495 18.9848 18.3653C20.2124 18.3693 21.4172 18.0339 22.4662 17.3963C25.6906 15.445 27.4166 10.8994 27.0841 5.23816ZM5.22874 17.0189C3.55093 16.0028 2.60156 13.5977 2.62452 10.5002C5.72202 10.4739 8.12718 11.4266 9.14327 13.1044C9.67374 13.9794 9.76015 14.9999 9.41234 16.051L6.74249 13.3811C6.57706 13.224 6.35678 13.1376 6.12862 13.1406C5.90045 13.1435 5.68245 13.2354 5.5211 13.3968C5.35975 13.5581 5.26781 13.7761 5.26489 14.0043C5.26197 14.2324 5.34829 14.4527 5.50546 14.6182L8.1753 17.288C7.12421 17.6358 6.10484 17.5494 5.22874 17.0189ZM21.5595 15.9011C20.0939 16.7882 18.3712 16.856 16.6212 16.1199L22.4936 10.2464C22.6508 10.081 22.7371 9.86073 22.7342 9.63256C22.7312 9.4044 22.6393 9.1864 22.4779 9.02504C22.3166 8.86369 22.0986 8.77176 21.8704 8.76884C21.6423 8.76591 21.422 8.85224 21.2566 9.00941L15.3831 14.8752C14.6437 13.1252 14.7105 11.4014 15.6019 9.93691C17.1266 7.42128 20.7425 6.0191 25.3723 6.12738C25.4773 10.7561 24.0773 14.3764 21.5595 15.9011Z"
							fill="#73946B"
						/>
					</svg>
				)}
				{data.id == "point3" && (
					<svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M11.6667 8.16667L11.0647 9.793C10.276 11.9257 9.88167 12.992 9.1035 13.7702C8.32533 14.5483 7.259 14.9427 5.12633 15.7313L3.5 16.3333L5.12633 16.9353C7.259 17.724 8.32533 18.1195 9.1035 18.8965C9.88167 19.6735 10.276 20.741 11.0647 22.8737L11.6667 24.5L12.2687 22.8737C13.0573 20.741 13.4528 19.6747 14.2298 18.8965C15.0068 18.1183 16.0743 17.724 18.207 16.9353L19.8333 16.3333L18.207 15.7313C16.0743 14.9427 15.008 14.5483 14.2298 13.7702C13.4517 12.992 13.0573 11.9257 12.2687 9.793L11.6667 8.16667ZM21 3.5L20.7422 4.1965C20.4038 5.11117 20.2347 5.5685 19.9022 5.901C19.5685 6.23467 19.1112 6.40383 18.1965 6.741L17.5 7L18.1977 7.25783C19.1112 7.59617 19.5685 7.76533 19.901 8.09783C20.2347 8.4315 20.4038 8.88883 20.741 9.8035L21 10.5L21.2578 9.8035C21.5962 8.88883 21.7653 8.4315 22.0978 8.099C22.4315 7.76533 22.8888 7.59617 23.8035 7.259L24.5 7L23.8023 6.74217C22.8888 6.40383 22.4315 6.23467 22.099 5.90217C21.7653 5.5685 21.5962 5.11117 21.259 4.1965L21 3.5Z"
							stroke="#73946B"
							strokeWidth="1.9375"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				)}

				<h3 className="mb-1 text-sm font-semibold text-gray-800 sm:mb-2 sm:text-base">{data.title}</h3>
			</div>
			<div className="text-xs text-gray-600 sm:text-sm">
				{(data.description as string).includes(", ") ? (
					(data.description as string).split(", ").map((v, i) => {
						return (
							<div key={i} className="flex flex-col">
								<div className="flex flex-row items-start gap-2">
									<svg className="mt-0.5 h-2 w-2 shrink-0 sm:mt-1 sm:h-3 sm:w-3" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
										<circle cx="4.5" cy="4.5" r="2.5" fill="#537D5D" />
										<circle cx="4.5" cy="4.5" r="4" stroke="#9EBC8A" />
									</svg>
									<p className="text-xs sm:text-sm">{v}</p>
								</div>
							</div>
						);
					})
				) : (
					<p className="text-xs sm:text-sm">{data.description}</p>
				)}
			</div>
			{data.details && <div className="mt-1 text-xs text-gray-500 sm:mt-2">{data.details}</div>}
		</div>
	);
};

const nodeTypes = {
	annotation: AnnotationNode,
	info: InfoNode,
};

const ContohDeteksi = () => {
	const [containerHeight, setContainerHeight] = useState(460); // default height
	const [isMobile, setIsMobile] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	// Check screen size
	useEffect(() => {
		const checkScreenSize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkScreenSize();
		window.addEventListener("resize", checkScreenSize);

		return () => window.removeEventListener("resize", checkScreenSize);
	}, []);

	// Data untuk annotation points
	const annotationData = [
		{
			id: "point1",
			position: { x: 206, y: 100 },
			title: "Nama Tanaman",
			description: "Daun sirih",
			details: "",
		},
		{
			id: "point2",
			position: { x: 120, y: 150 },
			title: "Manfaat Tanaman",
			description: "Anti-bacterial & Anti-septic, Mencegah bau mulut & menjaga kesehatan gigi, Meredakan keputihan & menjaga kesehatan organ intim wanita, Menyembuhkan luka ringan & mempercepat penyembuhan",
			details: "Tepi daun bisa bergerigi, halus, atau bergelombang.",
		},
		{
			id: "point3",
			position: { x: 160, y: 200 },
			title: "Deskripsi Tanaman",
			description: "Daun sirih adalah tanaman merambat yang termasuk dalam famili Piperaceae dan telah lama digunakan dalam pengobatan tradisional di Asia Tenggara, termasuk Indonesia. Tanaman ini dikenal dengan daun berbentuk hati berwarna hijau mengilap dan memiliki aroma khas yang kuat.",
			details: "",
		},
	];

	// Calculate dynamic positions for info nodes based on their content
	const calculateInfoNodePositions = () => {
		const baseHeight = isMobile ? 100 : 120; // smaller base height for mobile
		const extraHeightPerLine = isMobile ? 15 : 20; // less height per line on mobile
		const gap = isMobile ? 15 : 20; // smaller gap on mobile
		const xPosition = isMobile ? 280 : 400; // closer to image on mobile

		let currentY = 0;

		return annotationData.map((item, _index) => {
			const contentLines = item.description.includes(", ") ? item.description.split(", ").length : Math.ceil(item.description.length / (isMobile ? 60 : 80)); // adjust estimation for mobile

			const nodeHeight = baseHeight + contentLines * extraHeightPerLine;
			const position = { x: xPosition, y: currentY };

			currentY += nodeHeight + gap;

			return { ...item, position, nodeHeight };
		});
	};

	const positionedData = calculateInfoNodePositions();
	const totalHeight = positionedData.reduce((acc, item) => acc + item.nodeHeight + 20, 0) + 100; // add some padding

	// Create nodes with calculated positions
	const initialNodes: Node[] = [
		...annotationData.map((item, index) => ({
			id: `annotation-${item.id}`,
			type: "annotation",
			position: item.position,
			data: { label: `${index + 1}` },
			draggable: false,
		})),
		...positionedData.map((item) => ({
			id: `info-${item.id}`,
			type: "info",
			position: item.position,
			data: {
				id: item.id,
				title: item.title,
				description: item.description,
				details: item.details,
			},
			draggable: false,
		})),
	];

	const initialEdges: Edge[] = annotationData.map((item) => ({
		id: `edge-${item.id}`,
		source: `annotation-${item.id}`,
		target: `info-${item.id}`,
		animated: true,
		style: {
			stroke: "#7bf1a8",
			strokeWidth: 2,
		},
	}));

	const [nodes, _setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, _onEdgesChange] = useEdgesState(initialEdges);

	const sectionRef = useRef(null);
	const isInView = useInView(sectionRef, { once: true, margin: "-150px" });

	const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

	// Update container height based on content
	useEffect(() => {
		const newHeight = Math.max(totalHeight, isMobile ? 350 : 400); // smaller minimum height for mobile
		setContainerHeight(newHeight);
	}, [totalHeight, isMobile]);

	return (
		<motion.section
			ref={sectionRef}
			initial="hidden"
			animate={isInView ? "visible" : "hidden"}
			variants={{
				visible: { transition: { staggerChildren: 0.3 } },
				hidden: {},
			}}
			className="flex flex-col items-center gap-6 py-16 "
		>
			<div className="-mb-40 flex w-full max-w-7xl flex-col items-center gap-2.5 px-5">
				<motion.div
					variants={{
						hidden: { opacity: 0, y: 20 },
						visible: { opacity: 1, y: 0 },
					}}
					transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
					className="bg-green-second-light text-green-primary relative inline-flex items-center justify-center  rounded-full px-3 py-1 md:px-4 md:py-1"
				>
					<p className="relative text-sm md:text-lg">Contoh Hasil Deteksi</p>
				</motion.div>

				<motion.div
					variants={{
						hidden: { opacity: 0, y: 20 },
						visible: { opacity: 1, y: 0 },
					}}
					transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1], delay: 0.1 }}
					className="flex flex-col gap-1 text-center"
				>
					<h5 className="text-font-primary text-2xl md:text-3xl font-bold">Kenali Tanaman Herbal Populer</h5>
					<p className="text-font-primary md:text-lg font-normal">Beberapa contoh daun yang bisa kamu identifikasi langsung dengan Daunesia.</p>
				</motion.div>

				<div className="w-full overflow-x-auto xl:overflow-hidden">
					{/* 👇 DIV PEMBUNGKUS SEDERHANA INI ADALAH KUNCINYA 👇 */}
					<div className="w-max min-w-full">
						<motion.div
							ref={containerRef}
							variants={{
								hidden: { opacity: 0, y: 30 },
								visible: { opacity: 1, y: 0 },
							}}
							transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1], delay: 0.2 }}
							className="relative mt-8 w-7xl" // w-7xl membuat konten ini sangat lebar
							style={{ height: `${containerHeight}px` }}
						>
							<div className="relative aspect-square w-full max-w-xs  md:mx-0">
								<img src={sirih.src} alt="" className="h-full w-full rounded-lg object-cover shadow-md" />

								<div className="absolute inset-4">
									<svg className="object-cover" viewBox="0 0 324 324" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M322 82V12C322 6.47715 317.523 2 312 2H242M322 242V312C322 317.523 317.523 322 312 322H242M82 2H12C6.47715 2 2 6.47715 2 12V82M2 242V312C2 317.523 6.47715 322 12 322H82" stroke="white" strokeWidth="4" strokeLinejoin="round" />
									</svg>
								</div>
							</div>

							{/* React Flow overlay */}
							<div className="absolute inset-0 overflow-hidden rounded-lg">
								<ReactFlow //
									nodesDraggable={false}
									nodesConnectable={false}
									elementsSelectable={false}
									panOnDrag={false}
									zoomOnScroll={false}
									zoomOnDoubleClick={false}
									nodes={nodes}
									edges={edges}
									onNodesChange={onNodesChange}
									onConnect={onConnect}
									nodeTypes={nodeTypes}
									fitView={false}
									className="bg-transparent"
									proOptions={{ hideAttribution: true }}
								/>
							</div>

							<div className="absolute inset-0 z-10"></div>
						</motion.div>
					</div>
				</div>
			</div>
		</motion.section>
	);
};

export default ContohDeteksi;
