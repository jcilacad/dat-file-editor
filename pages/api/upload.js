import multer from 'multer';
import { parse } from 'csv-parse';
import { currentData } from '../../data';

export const config = {
  api: { bodyParser: false }
};

const upload = multer({ storage: multer.memoryStorage() }).single('file');

export default function handler(req, res) {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    // Check if the file uses quotes around fields
    const fileContent = file.buffer.toString();
    const firstLine = fileContent.split('\n')[0];
    const fields = firstLine.split('|');
    const isQuoted = fields.every(field => field.trim().startsWith('"') && field.trim().endsWith('"'));
    currentData.quoted = isQuoted;

    const parser = parse(file.buffer.toString(), {
      delimiter: '|',
      trim: true,
      quote: '"',
      skip_empty_lines: true
    });

    let headers = [];
    let dataRows = [];

    parser.on('readable', function () {
      let record;
      while ((record = parser.read()) !== null) {
        if (headers.length === 0) headers = record;
        else dataRows.push(record);
      }
    });

    parser.on('end', () => {
      currentData.headers = headers;
      currentData.dataRows = dataRows;
      currentData.fileName = file.originalname;
      res.status(200).json({ message: 'File uploaded successfully' });
    });

    parser.on('error', (err) => res.status(500).json({ error: err.message }));
  });
}