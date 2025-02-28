interface GeneratedImagesProps {
    images: string[];
  }
  
  export default function GeneratedImages({ images }: GeneratedImagesProps) {
    const handleDownload = async (url: string, filename: string) => {
      try {
        // Fetch the image through your server's API route
        const response = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
        if (!response.ok) {
          throw new Error('Failed to download image');
        }
  
        // Convert the response to a Blob
        const blob = await response.blob();
  
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename.replace('.png', '.jpg'); // Change the extension to .jpg
        document.body.appendChild(link);
        link.click(); // Trigger the download
        document.body.removeChild(link); // Clean up
      } catch (error) {
        console.error('Error downloading image:', error);
        alert('Failed to download image');
      }
    };
  
    return (
      <div>
        <h2>Generated Images</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {images.map((img, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <img
                src={img}
                alt={`Generated ${index + 1}`}
                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
              />
              <button
                onClick={() => handleDownload(img, `generated-image-${index + 1}.jpg`)} // Use .jpg extension
                style={{ marginTop: '10px' }}
              >
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }