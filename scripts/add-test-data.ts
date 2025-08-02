import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addTestData() {
  try {
    // Cari user berdasarkan email spesifik
    const targetEmail = "inisayafirman@gmail.com";
    const user = await prisma.user.findUnique({
      where: { email: targetEmail }
    });
    
    if (!user) {
      console.log(`❌ User dengan email ${targetEmail} tidak ditemukan`);
      console.log('💡 Silakan login terlebih dahulu dengan email tersebut');
      
      // Tampilkan user yang tersedia
      const allUsers = await prisma.user.findMany({
        select: { id: true, email: true, name: true }
      });
      
      if (allUsers.length > 0) {
        console.log('\n📋 User yang tersedia:');
        console.table(allUsers);
      } else {
        console.log('\n📋 Belum ada user di database');
      }
      return;
    }

    console.log(`👤 Adding test data for user: ${user.email} (${user.name})`);

    const testDetections = [
      {
        userId: user.id,
        plantName: "Aloe Vera (Lidah Buaya)",
        confidence: 96.8, // ✅ Sudah dalam bentuk percentage
      },
      {
        userId: user.id,
        plantName: "Physalis Angulata (Ciplukan)",
        confidence: 95.2, // ✅ Sudah dalam bentuk percentage
      },
      {
        userId: user.id,
        plantName: "Curcuma Longa (Kunyit)",
        confidence: 98.1, // ✅ Sudah dalam bentuk percentage
      },
      {
        userId: user.id,
        plantName: "Zingiber Officinale (Jahe)",
        confidence: 94.3, // ✅ Sudah dalam bentuk percentage
      },
      {
        userId: user.id,
        plantName: "Andrographis Paniculata (Sambiloto)",
        confidence: 93.7, // ✅ Sudah dalam bentuk percentage
      },
      {
        userId: user.id,
        plantName: "Aloe Vera (Lidah Buaya)",
        confidence: 97.5, // ✅ Sudah dalam bentuk percentage
      },
      {
        userId: user.id,
        plantName: "Moringa Oleifera (Kelor)",
        confidence: 96.2, // ✅ Sudah dalam bentuk percentage
      },
      {
        userId: user.id,
        plantName: "Curcuma Longa (Kunyit)",
        confidence: 95.8, // ✅ Sudah dalam bentuk percentage
      }
    ];

    // Cek apakah user sudah punya detection data
    const existingCount = await prisma.detection.count({
      where: { userId: user.id }
    });

    if (existingCount > 0) {
      console.log(`⚠️ User sudah memiliki ${existingCount} detection records`);
      console.log('🔄 Menghapus data lama dan menambah data baru...');
      
      // Delete existing data untuk user ini
      await prisma.detection.deleteMany({
        where: { userId: user.id }
      });
    }

    // Add new test data
    console.log('🌱 Menambahkan test detections...');
    for (const detection of testDetections) {
      await prisma.detection.create({
        data: detection
      });
      console.log(`  ✓ Added: ${detection.plantName} (${detection.confidence}%)`);
    }

    console.log('\n✅ Test detections added successfully!');
    
    // Verify data dengan statistik detail
    const finalCount = await prisma.detection.count({ 
      where: { userId: user.id } 
    });
    
    const uniquePlants = await prisma.detection.groupBy({
      by: ['plantName'],
      where: { userId: user.id },
      _count: { plantName: true }
    });

    const avgConfidence = await prisma.detection.aggregate({
      where: { userId: user.id },
      _avg: { confidence: true }
    });

    const mostCommon = await prisma.detection.groupBy({
      by: ['plantName'],
      where: { userId: user.id },
      _count: { plantName: true },
      orderBy: { _count: { plantName: 'desc' } },
      take: 1
    });

    console.log('\n📊 Statistik Final:');
    console.log(`   Total detections: ${finalCount}`);
    console.log(`   Unique plants: ${uniquePlants.length}`);
    console.log(`   Average accuracy: ${Math.round(avgConfidence._avg.confidence || 0)}%`);
    console.log(`   Favorite category: ${mostCommon[0]?.plantName || 'N/A'}`);

    console.log('\n🎉 Data siap untuk testing profile page!');

  } catch (error) {
    console.error('❌ Error adding test data:', error);
    
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
  } finally {
    await prisma.$disconnect();
  }
}

addTestData();