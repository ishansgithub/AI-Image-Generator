import { OpenAI } from 'openai';
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const image = formData.get('image') as File;

  if (!image) {
    return NextResponse.json(
      { message: 'No image provided' },
      { status: 400 }
    );
  }

  try {
    // Save the uploaded image temporarily
    const buffer = Buffer.from(await image.arrayBuffer());
    const filePath = path.join(process.cwd(), 'public', 'uploads', 'uploaded-image.png');
    fs.writeFileSync(filePath, buffer);

    // Call OpenAI's API
    const response = await openai.images.createVariation({
      image: fs.createReadStream(filePath) as any,
      n: 5, // Number of images to generate
      size: '256x256', // Image size
    });

    // Extract generated image URLs
    const images = response.data.map((img) => img.url);

    // Clean up the uploaded file
    fs.unlinkSync(filePath);

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error generating images:', error);
    return NextResponse.json(
      { message: 'Failed to generate images' },
      { status: 500 }
    );
  }
}