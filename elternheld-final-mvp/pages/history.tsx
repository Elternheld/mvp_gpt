import { useState, useEffect } from "react";
import { getOwnActivities } from "@/lib/api";
import { ActivityCard } from "@/components/ActivityCard";
import { useUser } from "@clerk/nextjs";

export default function History() {
  const { user } = useUser();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function fetchActivities() {
      if (user) {
        const data = await getOwnActivities();
        setActivities(data);
      }
    }
    fetchActivities();
  }, [user]);

  return (
    <main className="min-h-screen bg-[#FFF6EC] p-6">
      <h1 className="text-3xl text-[#2E2E2E] font-bold mb-6">Mein Verlauf</h1>
      <div className="flex flex-col gap-4">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} prompt={activity.prompt} result={activity.result} />
        ))}
      </div>
    </main>
  );
}
