import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
  try {
    const session = await auth.api.getSession(req);
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Get user's detection count and recent detections
    const detectionCount = await prisma.detection.count({
      where: { userId }
    });

    const recentDetections = await prisma.detection.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        plantName: true,
        confidence: true,
        createdAt: true
      }
    });

    // Calculate unique plants identified
    const uniquePlants = await prisma.detection.groupBy({
      by: ['plantName'],
      where: { userId }
    });

    // Calculate average confidence as accuracy rate
    const avgConfidence = await prisma.detection.aggregate({
      where: { userId },
      _avg: {
        confidence: true
      }
    });

    // Get most detected plant as favorite category
    const favoriteCategory = await prisma.detection.groupBy({
      by: ['plantName'],
      where: { userId },
      _count: {
        plantName: true
      },
      orderBy: {
        _count: {
          plantName: 'desc'
        }
      },
      take: 1
    });

    const stats = {
      totalDetections: detectionCount,
      plantsIdentified: uniquePlants.length,
      // ✅ Fix: Jangan multiply dengan 100 di sini, karena data di DB sudah dalam bentuk percentage
      accuracyRate: Math.round(avgConfidence._avg.confidence || 0),
      favoriteCategory: favoriteCategory[0]?.plantName || "Belum ada"
    };

    return NextResponse.json({
      stats,
      recentDetections: recentDetections.map(d => ({
        id: d.id,
        plantName: d.plantName,
        detectedAt: d.createdAt.toISOString(),
        // ✅ Fix: Jangan multiply dengan 100 di sini juga
        confidence: Math.round(d.confidence)
      })),
      achievements: [
        {
          id: "1",
          title: "First Step",
          description: "Melakukan deteksi pertama",
          icon: "sprout",
          unlocked: detectionCount > 0,
          unlockedAt: detectionCount > 0 ? recentDetections[recentDetections.length - 1]?.createdAt.toISOString() : undefined,
          progress: detectionCount > 0 ? 100 : 0
        },
        {
          id: "2",
          title: "Plant Explorer",
          description: "Mengidentifikasi 5+ jenis tanaman",
          icon: "leaf",
          unlocked: uniquePlants.length >= 5,
          unlockedAt: uniquePlants.length >= 5 ? new Date().toISOString() : undefined,
          progress: Math.min(uniquePlants.length, 5)  // ✅ Ubah ke skala 5
        },
        {
          id: "3",
          title: "Accuracy Master",
          description: "Mencapai akurasi rata-rata 90%+",
          icon: "badge",
          // ✅ Fix: Bandingkan dengan 90, bukan 0.9
          unlocked: (avgConfidence._avg.confidence || 0) >= 90,
          unlockedAt: (avgConfidence._avg.confidence || 0) >= 90 ? new Date().toISOString() : undefined,
          progress: Math.min(((avgConfidence._avg.confidence || 0) / 90) * 100, 100)
        }
      ]
    });

  } catch (error) {
    console.error('Profile API error:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};