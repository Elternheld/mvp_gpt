// Example of an API route
export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'Activity endpoint is working!' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}