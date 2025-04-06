import { NextFunction, Request } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (req: any, res: any, next: NextFunction) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.status(404).json({
        message: "Did not recive the token!",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    if (!decodedToken) {
      return res.status(404).json({
        message: "Unable to decode the token",
      });
    }
    req.userId = decodedToken;
    next();
  } catch (error) {
    console.error(error);
    return res.status(404).json({
      message: "Unauthorised",
    });
  }
};
