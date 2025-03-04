import { stringify } from 'csv-stringify';
import { currentData } from '../../data';

export default function handler(req, res) {
  const dataToDownload = [currentData.headers, ...currentData.dataRows];
  const options = {
    delimiter: '|',
    quote: '"',
    quoted: currentData.quoted || false // Quote all fields if original file was quoted
  };
  stringify(dataToDownload, options, (err, output) => {
    if (err) return res.status(500).json({ error: err.message });
    res.setHeader('Content-Disposition', `attachment; filename="${currentData.fileName}"`);
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(output);
  });
}