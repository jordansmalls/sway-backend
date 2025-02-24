import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { notFound, errorHandler } from './middleware/errorMiddleware';
import connectDB from "./config/db";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes";




const PORT: number = parseInt(process.env.PORT || "8080", 10)


// connect to mongoDB
connectDB();


const app = express();




// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// routes
app.use("/api/users", userRoutes);




app.get("/", (req: Request, res: Response) => {
    res.send("Server is running.")
})

app.get("/test", (req: Request, res: Response) => {
    res.json({message: `Server is live on port ${PORT}!`})
} )



// error handling
app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`))