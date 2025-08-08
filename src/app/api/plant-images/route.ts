import { NextRequest, NextResponse } from 'next/server';
import { getPlantImagesFromTebi } from '@/lib/tebi';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const plantName = searchParams.get('plant');
  
  if (!plantName) {
    return NextResponse.json(
      { error: 'Plant name is required' }, 
      { status: 400 }
    );
  }

  try {
    const images = await getPlantImagesFromTebi(plantName);
    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error fetching plant images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch plant images' }, 
      { status: 500 }
    );
  }
}
