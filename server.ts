import express, { Request, Response } from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
app.use(cors());
app.use(express.json());

const PORT: number = parseInt(process.env.PORT || "8080", 10)

import "./types/express";


app.get("/", (req: Request, res: Response) => {
    res.send("Server is running.")
})

app.get("/test", (req: Request, res: Response) => {
    res.json({message: `Server is live on port ${PORT}!`})
} )

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`))