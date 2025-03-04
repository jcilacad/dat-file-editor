import { stringify } from 'csv-stringify';
import { currentData } from '../../data';

export default function handler(req, res) {
  // Prepare the data for download
  const dataToDownload = [currentData.headers, ...currentData.dataRows];

  // Define csv-stringify options
  const options = {
    delimiter: '|',               // Use pipe as delimiter
    quote: '"',                   // Use double quotes for quoting
    quoted: currentData.quoted || false, // Quote all fields if original file was quoted
    quoted_empty: currentData.quoted           // Ensure blank/empty fields are quoted as ""
  };

  // Generate the CSV string and send it as a response
  stringify(dataToDownload, options, (err, output) => {
    if (err) return res.status(500).json({ error: err.message });
    res.setHeader('Content-Disposition', `attachment; filename="${currentData.fileName}"`);
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(output);
  });
}