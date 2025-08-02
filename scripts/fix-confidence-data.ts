// scripts/fix-confidence-data.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixConfidenceData() {
  try {
    // Get all detections with confidence > 100 (wrong format)
    const wrongDetections = await prisma.detection.findMany({
      where: {
        confidence: {
          gt: 100
        }
      }
    });

    console.log(`Found ${wrongDetections.length} detections with wrong confidence format`);

    // Fix each one
    for (const detection of wrongDetections) {
      const correctedConfidence = detection.confidence / 100;
      
      await prisma.detection.update({
        where: { id: detection.id },
        data: { confidence: correctedConfidence }
      });
      
      console.log(`Fixed: ${detection.plantName} - ${detection.confidence}% -> ${correctedConfidence}%`);
    }

    console.log('✅ All confidence data fixed!');
  } catch (error) {
    console.error('❌ Error fixing confidence data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixConfidenceData();