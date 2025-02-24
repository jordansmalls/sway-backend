import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/userModel";

interface AuthRequest extends Request {
    user?: IUser;
}

const protect = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies?.jwt;
    if (!token) throw new Error("Not authorized, no token.");

    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is missing.");

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) throw new Error("Not authorized, user not found.");

    req.user = user; // now TS knows its definitely not null.

    next();
});

export default protect;
