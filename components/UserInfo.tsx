import { useAuth } from "@clerk/nextjs";

export default function UserInfo() {
  const { userId, sessionId } = useAuth();

  if (!userId) {
    return <div>Please log in to view your information.</div>;
  }

  return (
    <div>
      <h1>User Information</h1>
      <p><strong>User ID:</strong> {userId}</p>
      <p><strong>Session ID:</strong> {sessionId}</p>
    </div>
  );
}