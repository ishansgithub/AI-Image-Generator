import { NextResponse } from 'next/server';
import fetch from 'node-fetch';
import sharp from 'sharp';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url'); // Get the image URL from query params

  if (!imageUrl) {
    return NextResponse.json(
      { message: 'Image URL is required' },
      { status: 400 }
    );
  }

  try {
    // Fetch the image from OpenAI's URL
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }

    // Convert the image to a buffer
    const imageBuffer = await response.buffer();

    // Convert the image to JPG format using sharp
    const jpgBuffer = await sharp(imageBuffer)
      .jpeg() // Convert to JPG
      .toBuffer();

    // Set the Content-Disposition header to force download
    return new NextResponse(jpgBuffer, {
      headers: {
        'Content-Disposition': `attachment; filename="generated-image.jpg"`,
        'Content-Type': 'image/jpeg', // Set the MIME type to JPG
      },
    });
  } catch (error) {
    console.error('Error downloading image:', error);
    return NextResponse.json(
      { message: 'Failed to download image' },
      { status: 500 }
    );
  }
}