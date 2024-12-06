import express from 'express';
import cors from 'cors';
import { db } from './db';

const app = express();

interface TimeEntry {
  client_id: number;
  start_time: string;
  end_time: string;
  description: string;
}

app.use(cors());
app.use(express.json());

app.get('/api/time-entries', (_req, res) => {
  db.all('SELECT * FROM time_entries', (err: Error | null, rows: TimeEntry[]) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/time-entries', (req, res) => {
  const { client_id, start_time, end_time, description } = req.body as TimeEntry;
  
  db.run(
    `INSERT INTO time_entries (client_id, start_time, end_time, description)
     VALUES (?, ?, ?, ?)`,
    [client_id, start_time, end_time, description],
    function(this: { lastID: number }, err: Error | null) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));