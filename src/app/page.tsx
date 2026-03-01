'use client';
import InputForm from '@/components/InputForm';
export default function Home() {
  const handleCalculate = (data: any) => {
    console.log("Participants Data:", data);
    alert("Check the console! Math logic coming next.");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-black to-zinc-900 text-white">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-black text-center mb-2 tracking-tighter italic">
          VIBE<span className="text-purple-500">SPLIT</span>
        </h1>
        <p className="text-zinc-500 text-center mb-8 text-sm">No awkwardness, just vibes.</p>
        
        <InputForm onCalculate={handleCalculate} />
      </div>
    </main>
  );
}
