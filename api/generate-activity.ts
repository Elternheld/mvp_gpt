export default function handler(req, res) {
  if (req.method === 'POST') {
    res.status(200).json({
      activity: 'Kartenspiel mit Belohnungssystem – fördert logisches Denken und Geduld.'
    })
  } else {
    res.status(405).end()
  }
}