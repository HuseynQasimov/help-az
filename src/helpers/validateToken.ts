import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "config";

export async function auth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json();
    }

    jwt.verify(token, config.get("secret-key"), (err, data) => {
        if (err) {
            return res.status(403).json();
        }

        next();
    });
}
