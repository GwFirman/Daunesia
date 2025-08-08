import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import axios, { AxiosError } from "axios";

const prisma = new PrismaClient();

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "mongodb",
	}),
	emailAndPassword: {
		enabled: true,
		autoSignIn: false,
		sendResetPassword: async ({ user, url, token }, request) => {
			// Mengambil data kredensial dari environment variables untuk keamanan
			const apiToken = process.env.MAILTRAP_API_TOKEN;
			const fromEmail = process.env.MAILTRAP_FROM_EMAIL || "hello@kurawal.site";

			// --- PERUBAHAN DI SINI ---
			// Menggunakan nama aplikasi dan tim yang spesifik
			const appName = process.env.APP_NAME || "Daunesia";
			const teamName = process.env.TEAM_NAME || "Kurawal Creative";
			// -------------------------

			if (!apiToken) {
				console.error("MAILTRAP_API_TOKEN tidak ditemukan di environment variables.");
				return;
			}

			const data = JSON.stringify({
				from: {
					email: fromEmail,
					name: appName, // Nama pengirim email adalah nama aplikasi
				},
				to: [
					{
						email: user.email,
					},
				],
				subject: `[${appName}] Instruksi Pengaturan Ulang Kata Sandi`, // Subjek email juga mencantumkan nama aplikasi
				html: `
                <p>Halo ${user.name || "Pengguna"},</p>
                <p>Anda menerima email ini karena ada permintaan untuk mengatur ulang kata sandi untuk akun Anda di ${appName}.</p>
                <p>Klik tautan di bawah ini untuk melanjutkan:</p>
                <p><a href="${url}" style="color: #ffffff; background-color: #007bff; padding: 10px 15px; text-decoration: none; border-radius: 5px;">Atur Ulang Kata Sandi</a></p>
                <p>Jika Anda tidak merasa meminta ini, abaikan saja email ini.</p>
                <br>
                <p>Terima kasih,</p>
                <p>Tim ${teamName}</p> 
            `,
				text: `Halo ${user.name || "Pengguna"}, salin dan tempel URL berikut di browser Anda untuk mengatur ulang kata sandi di ${appName}: ${url}`,
				category: "Password Reset",
			});

			const config = {
				method: "post",
				url: "https://send.api.mailtrap.io/api/send",
				headers: {
					Authorization: `Bearer ${apiToken}`,
					"Content-Type": "application/json",
				},
				data: data,
			};

			try {
				const response = await axios(config);
				console.log("Email berhasil dikirim:", JSON.stringify(response.data));
			} catch (error) {
				if (!(error instanceof AxiosError)) return;
				console.error("Gagal mengirim email:", error.response ? error.response.data : error.message);
			}
		},

		onPasswordReset: async ({ user }: { user: { email: string; [key: string]: any } }, request: any) => {
			console.log(`Kata sandi untuk pengguna ${user.email} telah berhasil diatur ulang.`);
		},
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
		facebook: {
			clientId: process.env.FACEBOOK_CLIENT_ID as string,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
		},
	},
});
