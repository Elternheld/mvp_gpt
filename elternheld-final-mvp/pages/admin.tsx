import { useEffect, useState } from "react";
import { getAllActivities } from "@/lib/api";
import { useUser } from "@clerk/nextjs";

const ADMIN_EMAIL = "elternheld@gmail.com";

export default function Admin() {
  const { user } = useUser();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function fetchAll() {
      if (user?.primaryEmailAddress?.emailAddress === ADMIN_EMAIL) {
        const data = await getAllActivities();
        setActivities(data);
      }
    }
    fetchAll();
  }, [user]);

  if (!user || user.primaryEmailAddress?.emailAddress !== ADMIN_EMAIL) {
    return <div className="p-6">Kein Zugriff.</div>;
  }

  return (
    <main className="min-h-screen bg-[#FFF6EC] p-6">
      <h1 className="text-3xl text-[#2E2E2E] font-bold mb-6">Admin: Alle Aktivitäten</h1>
      <div className="flex flex-col gap-4">
        {activities.map((activity) => (
          <div key={activity.id} className="p-4 bg-white rounded-xl shadow-md">
            <p><b>Prompt:</b> {activity.prompt}</p>
            <p><b>Result:</b> {activity.result}</p>
            <p><b>Provider:</b> {activity.provider}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
