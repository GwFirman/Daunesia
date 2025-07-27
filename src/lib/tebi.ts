import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const tebiClient = new S3Client({
  region: "global",
  endpoint: "https://s3.tebi.io",
  credentials: {
    accessKeyId: process.env.TEBI_ACCESS_KEY_ID!,
    secretAccessKey: process.env.TEBI_SECRET_ACCESS_KEY!,
  },
});

export async function getPlantImagesFromTebi(plantName: string): Promise<string[]> {
  const bucketName = "gambar-tanaman";
  const imageUrls: string[] = [];
  
  try {
    // Get 5 images for the plant
    for (let i = 1; i <= 5; i++) {
      const objectKey = `${plantName}/${plantName}-${i}.jpg`;
      
      try {
        const command = new GetObjectCommand({
          Bucket: bucketName,
          Key: objectKey,
        });

        const response = await tebiClient.send(command);
        
        if (response.Body) {
          const chunks: Buffer[] = [];
          for await (const chunk of response.Body as NodeJS.ReadableStream) {
            chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
          }
          const buffer = Buffer.concat(chunks);
          const imageUrl = `data:${response.ContentType};base64,${buffer.toString("base64")}`;
          imageUrls.push(imageUrl);
        }
      } catch (error) {
        console.log(`Image ${i} not found for ${plantName}`);
        // Continue to next image if one is not found
        continue;
      }
    }
    
    return imageUrls;
  } catch (error) {
    console.error("Error getting plant images from Tebi:", error);
    return [];
  }
}

export { tebiClient };