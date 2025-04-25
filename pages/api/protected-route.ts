import { requireAuth } from "@clerk/nextjs/api";

export default requireAuth((req, res) => {
  const { userId } = req.auth;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.status(200).json({ message: `Hello, user ${userId}!` });
});