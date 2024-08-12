import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors'

import path from 'path' // for deployment

import { connectDB } from './db/connectDB.js';

import authRoutes from './routes/auth.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve() // for deployment

app.use(cors({origin:"http://localhost:5173", credentials:true}))

app.use(express.json()); // allow us to parse incoming request with JSON payLoads
app.use(cookieParser()); // allow us toh parse incoming cookies


app.use('/api/auth', authRoutes)

// for deployment
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port : " , PORT)
})

