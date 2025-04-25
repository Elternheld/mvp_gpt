export default async function handler(req, res) {
    if (req.method === "POST") {
      // Extract data from the request body
      const { input } = req.body;
  
      // Example logic: Simulate processing the input
      const result = `Processed input: ${input}`;
  
      // Respond with the result
      res.status(200).json({ success: true, result });
    } else {
      // Handle unsupported HTTP methods
      res.status(405).json({ message: "Method Not Allowed" });
    }
  }