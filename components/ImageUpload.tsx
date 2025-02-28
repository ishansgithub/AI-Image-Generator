import { ChangeEvent } from 'react';

interface ImageUploadProps {
  onGenerate: (image: File) => void;
  loading: boolean;
}

export default function ImageUpload({ onGenerate, loading }: ImageUploadProps) {
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onGenerate(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <button disabled={loading}>
        {loading ? 'Generating...' : 'AI Generate'}
      </button>
    </div>
  );
}