import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("url");
  const defaultAvatar = "/images/default-avatar.png";
  
  if (!imageUrl) {
    return NextResponse.redirect(new URL(defaultAvatar, request.url));
  }

  try {
    // Menggunakan cache untuk mengurangi request ke Google
    const response = await fetch(imageUrl, {
      headers: {
        // Penting: Custom User-Agent untuk menghindari deteksi sebagai bot
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 Daunesia/1.0",
        "Accept": "image/*"
      },
      next: { revalidate: 86400 } // Cache selama 24 jam
    });
    
    if (!response.ok) {
      console.error(`Failed to fetch image: ${response.status}`);
      return NextResponse.redirect(new URL(defaultAvatar, request.url));
    }

    const buffer = await response.arrayBuffer();
    const headers = new Headers();
    headers.set("Content-Type", response.headers.get("Content-Type") || "image/jpeg");
    headers.set("Cache-Control", "public, max-age=86400"); // Cache client-side selama 24 jam
    
    return new Response(buffer, { headers });
  } catch (error) {
    console.error("Error fetching image:", error);
    return NextResponse.redirect(new URL(defaultAvatar, request.url));
  }
}