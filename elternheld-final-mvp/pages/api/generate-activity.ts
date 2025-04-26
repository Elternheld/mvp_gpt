import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { getOpenAIResponse } from "@/lib/openai";
import { getGeminiResponse } from "@/lib/gemini";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Nur POST erlaubt" });
  }

  const { prompt, provider, user_id } = req.body;

  if (!prompt || !provider || !user_id) {
    return res.status(400).json({ message: "Fehlende Parameter" });
  }

  try {
    let result = "";
    if (provider === "openai") {
      result = await getOpenAIResponse(prompt);
    } else {
      result = await getGeminiResponse(prompt);
    }

    await supabase.from("activities").insert([
      { prompt, result, provider, user_id }
    ]);

    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfehler" });
  }
}
