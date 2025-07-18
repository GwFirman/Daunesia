import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { Client, handle_file } from "@gradio/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const MAX_LIMIT_GUEST = 5;
const MAX_LIMIT_USER = 100;

function isNewDay(last: Date): boolean {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const lastDate = new Date(last);
	lastDate.setHours(0, 0, 0, 0);
	return today.getTime() !== lastDate.getTime();
}

async function checkRateLimit(key: string, isUser: boolean) {
	const max = isUser ? MAX_LIMIT_USER : MAX_LIMIT_GUEST;
	const record = await prisma.rateLimit.findUnique({ where: { key } });

	if (!record) {
		await prisma.rateLimit.create({ data: { key, count: 1 } });
		return;
	}

	if (isNewDay(record.updatedAt)) {
		await prisma.rateLimit.update({ where: { key }, data: { count: 1 } });
		return;
	}

	if (record.count >= max) {
		throw new Error("LIMIT_REACHED");
	}

	await prisma.rateLimit.update({ where: { key }, data: { count: { increment: 1 } } });
}

export const POST = async (req: NextRequest) => {
	try {
		const session = await auth.api.getSession(req);
		const ip = req.headers.get("x-forwarded-for") || "guest";
		const key = session?.user?.id || ip;
		const isUser = !!session?.user;

		const formData = await req.formData();
		const file = formData.get("file");

		if (!file || !(file instanceof File)) {
			return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
		}

		if (!file.type.startsWith("image/")) {
			return NextResponse.json({ error: "File bukan gambar" }, { status: 400 });
		}

		try {
			await checkRateLimit(key, isUser);
		} catch (err) {
			return NextResponse.json({ error: isUser ? "Limit harian tercapai (100)" : "Limit tamu tercapai (5). Silakan login." }, { status: 429 });
		}

		const buffer = await file.arrayBuffer();
		const app = await Client.connect("GwFirman/Daunesia");
		const result = await app.predict("/predict", [handle_file(Buffer.from(buffer))]);

		return NextResponse.json({ success: true, result });
	} catch {
		return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
	}
};

export const GET = async (req: NextRequest) => {
	try {
		const session = await auth.api.getSession(req);
		const ip = req.headers.get("x-forwarded-for") || "guest";
		const key = session?.user?.id || ip;
		const isUser = !!session?.user;
		const max = isUser ? MAX_LIMIT_USER : MAX_LIMIT_GUEST;

		const record = await prisma.rateLimit.findUnique({ where: { key } });

		let remaining = max;
		if (record) {
			remaining = isNewDay(record.updatedAt) ? max : Math.max(0, max - record.count);
		}

		return NextResponse.json({ loggedIn: isUser, remaining }, { headers: { "Cache-Control": "no-store" } });
	} catch {
		return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
	}
};
