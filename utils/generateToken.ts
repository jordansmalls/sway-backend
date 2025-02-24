import jwt from "jsonwebtoken";
import { Response } from "express";

const generateToken = (res: Response, userId: string) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("Server error: JWT_SECRET is missing.");
    }

    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development", // secure cookies in prod
            sameSite: "strict", // prevent CSRF attacks
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error("Server error: token generation failed.");
    }
};

export default generateToken;
