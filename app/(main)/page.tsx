import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <p>Welcome to the AI Image Generator!</p>
      <Link href="/generate">
        <button>Go to Image Generator</button>
      </Link>
    </div>
  );
}