import { currentData } from '../../data';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { dataRows } = req.body;
    currentData.dataRows = dataRows;
    res.status(200).json({ message: 'Data updated successfully' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}