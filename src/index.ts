import dotenv from 'dotenv';
import app from './app';
import { initDb } from './db';

dotenv.config();

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await initDb();
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to initialize database', err);
    process.exit(1);
  }
})();
