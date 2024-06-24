import express from "express";
const app = express();
import dotenv from 'dotenv'
import db from './db/index.js'
import cors from 'cors'
import bodyParser from "body-parser";
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import pollRoutes from './routes/polls.js';
import authenticate from './middlewares/auth.js';
import protectedRoute from './routes/protectedRoute.js'

dotenv.config({
  path: "./.env",
});


app.use(cors());
app.use(bodyParser.json());

// Database connection db
db

app.use('/auth', authRoutes);
app.use('/users', authenticate, userRoutes);
app.use('/polls', authenticate, pollRoutes);
app.use('/api', protectedRoute);



app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});


