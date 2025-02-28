'use client'; // Mark as a Client Component
import { useState } from 'react';
import ImageUpload from '../../../components/ImageUpload';
import GeneratedImages from '../../../components/GeneratedImage';

export default function GeneratePage() {
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGenerate = async (image: File) => {
    setLoading(true);

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setGeneratedImages(data.images);
    } catch (error) {
      console.error('Error generating images:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ImageUpload onGenerate={handleGenerate} loading={loading} />
      <GeneratedImages images={generatedImages} />
    </div>
  );
}