import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    res.status(200).json({
      activity: 'Kartenspiel mit Belohnungssystem – fördert logisches Denken und Geduld.'
    })
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}