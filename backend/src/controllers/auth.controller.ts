import { Request, Response } from "express";
import { registrationSchema } from "../types/type";
import bcrypt from "bcrypt";
import prisma from "../lib/db.js";

export const registration = async (req: Request, res: Response) => {
  const parsedData = registrationSchema.safeParse(req.body);
  if (!parsedData) {
    return res.status(404).json({
      message: "Invalid credentials",
    });
  }

  try {
    const ifExists = await prisma.user.findOne({
      email: parsedData.data?.email,
    });

    if (ifExists) {
      return res.status(404).json({
        message: "User already Exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      parsedData.data?.password || "",
      10
    );

    const user = await prisma.user.create({
      fullname: parsedData.data?.fullname,
      email: parsedData.data?.email,
      password: hashedPassword,
    });

    if (!user) {
      return res.status(404).json({
        message: "Registration Unsuccessful",
      });
    }

    res.status(200).json({
      message: "Registration Successful",
    });
  } catch (error) {
    return res.status(404).json({
      error: "Registration Unsuccessful!!",
    });
  }
};
