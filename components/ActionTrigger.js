import { useState } from "react";

export default function ActionTrigger() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAction = async () => {
    setLoading(true);
    setError(null); // Reset error state

    try {
      const res = await fetch("/api/handle-action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: "example input" }), // Replace with your input data
      });

      if (!res.ok) {
        throw new Error(`Failed with status ${res.status}`);
      }

      const result = await res.json();
      setResponse(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleAction} disabled={loading}>
        {loading ? "Processing..." : "Trigger Action"}
      </button>
      {response && <div>Response: {JSON.stringify(response)}</div>}
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
    </div>
  );
}