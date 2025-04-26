import { supabase } from "@/lib/supabase";

export async function generateActivity(prompt: string, provider: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const res = await fetch("/api/generate-activity", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      provider,
      user_id: user?.id,
    }),
  });

  if (!res.ok) throw new Error("Fehler beim Erstellen der Aktivität");

  return res.json();
}

export async function getOwnActivities() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getAllActivities() {
  const res = await fetch("/api/admin/get-activities");

  if (!res.ok) throw new Error("Fehler beim Abrufen der Aktivitäten");

  return res.json();
}
