// server.js
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './src/config/db.js';
import faqRoutes from './src/routes/faqRoutes.js';

// Load environment variables from .env
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Enable CORS so the frontend on a different port can call this API
app.use(cors());

// Parse incoming JSON
app.use(bodyParser.json());

// Register FAQ routes (e.g., http://localhost:8000/api/faqs)
app.use('/api/faqs', faqRoutes);

// Optional: A 404 catch-all
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Start the server on the PORT from .env or 8000 by default
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
