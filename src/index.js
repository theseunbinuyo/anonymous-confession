import express from 'express';
import authRouter from './routes/authRoutes.js';
import confessionRouter from './routes/confessionRoutes.js';
import { connectDB } from './config/db.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.use(cors({
    origin: [
        "http://localhost:5173",
        ""
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));


await connectDB();


app.use('/api', authRouter);
app.use('/api', confessionRouter);


app.get('/', (req, res) => {
  res.json({ 
    success: true,
    message: '🎭 Anonymous Confessions API is running!'
  });
});


if (process.env.NODE_ENV !== "production") {
  app.listen(5000, () => {
    console.log(`🚀 Server running on http://localhost:5000`);
  });
}

export default app;