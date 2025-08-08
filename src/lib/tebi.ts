import { S3Client, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";

// Get credentials from environment, stripping any quotes that may be present
const accessKeyId = process.env.TEBI_ACCESS_KEY_ID?.replace(/^["']|["']$/g, '') || '';
const secretAccessKey = process.env.TEBI_SECRET_ACCESS_KEY?.replace(/^["']|["']$/g, '') || '';

// Debug log for troubleshooting (remove in production)
console.log("Tebi credentials available:", !!accessKeyId && !!secretAccessKey);

const tebiClient = new S3Client({
  region: "global",
  endpoint: "https://s3.tebi.io",
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  // Force path style for compatibility with Tebi.io
  forcePathStyle: true
});

export async function getPlantImagesFromTebi(plantName: string): Promise<string[]> {
  const bucketName = "gambar-tanaman";
  const imageUrls: string[] = [];
  
  try {
    console.log(`Fetching images for plant: ${plantName}`);
    
    // First list all objects with the plant name prefix to get actual image files
    const listCommand = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: `${plantName}/`,
      MaxKeys: 10, // Increased to ensure we get enough actual images
    });

    const listResponse = await tebiClient.send(listCommand);
    
    console.log("List response:", { 
      found: !!listResponse.Contents,
      count: listResponse.Contents?.length || 0
    });
    
    if (listResponse.Contents && listResponse.Contents.length > 0) {
      // Filter out folder entries (keys ending with '/') and non-image files
      const imageKeys = listResponse.Contents
        .map(item => item.Key)
        .filter(key => key && !key.endsWith('/'))
        .filter(key => /\.(jpe?g|png|gif|webp|bmp)$/i.test(key || ''));
      
      console.log(`Found ${imageKeys.length} image files after filtering`);

      // Process only the first 5 image files
      const imagesToProcess = imageKeys.slice(0, 5);
      
      // Process each found image
      for (const key of imagesToProcess) {
        if (!key) continue;
        
        try {
          console.log(`Processing image: ${key}`);
          const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: key,
          });

          const response = await tebiClient.send(command);
          
          if (response.Body) {
            const chunks: Buffer[] = [];
            for await (const chunk of response.Body as NodeJS.ReadableStream) {
              chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
            }
            const buffer = Buffer.concat(chunks);
            const imageUrl = `data:${response.ContentType || 'image/jpeg'};base64,${buffer.toString("base64")}`;
            imageUrls.push(imageUrl);
            console.log(`Successfully processed image: ${key}`);
          }
        } catch (error) {
          console.log(`Error processing image ${key}:`, error);
          continue;
        }
      }
    } else {
      console.log(`No images found for plant: ${plantName}`);
    }
    
    return imageUrls;
  } catch (error) {
    console.error("Error getting plant images from Tebi:", error);
    return [];
  }
}

export { tebiClient };