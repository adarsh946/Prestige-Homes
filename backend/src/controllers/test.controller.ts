import { Request } from "express";
import jwt from "jsonwebtoken";

const shouldBeLogin = (req: Request, res: any) => {
  // Just check the user is logged in or not

  console.log(req.userId);
  res.status(200).json({
    message: "your are Loggedin",
  });
};

export const shouldBeAdmin = (req: Request, res: any) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(404).json({
      message: "Authentication Failed",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!);
  if (!decoded.isAdmin) {
    return res.status(404).json({
      message: "Not authorised",
    });
  }

  res.status(200).json({
    message: "you are authenticated",
  });
};
