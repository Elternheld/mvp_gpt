import { useState } from "react";
import { generateActivity } from "@/lib/api";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState("gemini");

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await generateActivity(prompt, provider);
      setResult(res.result);
    } catch (e) {
      setResult("Fehler beim Generieren.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FFF6EC] flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl text-[#2E2E2E] font-bold mb-6">Aktivität erstellen</h1>

      <textarea
        className="border rounded-xl p-4 w-full max-w-md bg-white shadow-md text-[#2E2E2E]"
        placeholder="Alter, Wetter, Ort..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <select
        value={provider}
        onChange={(e) => setProvider(e.target.value)}
        className="mt-4 p-2 rounded-xl border shadow-sm"
      >
        <option value="gemini">Gemini</option>
        <option value="openai">OpenAI</option>
      </select>

      <button
        onClick={handleGenerate}
        className="mt-6 bg-[#F58A7B] text-white px-6 py-3 rounded-xl shadow-md hover:bg-[#e6796c]"
      >
        {loading ? "Generiert..." : "Vorschlag anzeigen"}
      </button>

      {result && (
        <div className="mt-6 bg-white p-6 rounded-xl shadow-md w-full max-w-md text-[#2E2E2E]">
          {result}
        </div>
      )}
    </main>
  );
}
