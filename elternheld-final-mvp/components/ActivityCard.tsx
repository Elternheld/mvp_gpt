interface ActivityCardProps {
    prompt: string;
    result: string;
  }
  
  export function ActivityCard({ prompt, result }: ActivityCardProps) {
    return (
      <div className="p-4 bg-white rounded-xl shadow-md">
        <p className="text-[#2E2E2E] font-semibold mb-2">Prompt:</p>
        <p className="text-[#2E2E2E] mb-4">{prompt}</p>
        <p className="text-[#2E2E2E] font-semibold mb-2">Resultat:</p>
        <p className="text-[#2E2E2E]">{result}</p>
      </div>
    );
  }
  