export default function MainLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>AI Image Generator</h1>
        {children}
      </div>
    );
  }