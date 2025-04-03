import { Request, Response } from "express";
import { loginSchema, registrationSchema } from "../types/type";
import bcrypt from "bcrypt";
import prisma from "../lib/db.js";
import jwt from "jsonwebtoken";

export const registration = async (req: Request, res: any) => {
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

export const login = async (req: Request, res: any) => {
  const parsedData = loginSchema.safeParse(req.body);
  if (!parsedData) {
    return res.status(404).json({
      message: "Invalid Credentials",
    });
  }

  try {
    const user = await prisma.user.findOne({
      email: parsedData.data?.email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const passwordValidation = await bcrypt.compare(
      parsedData.data?.password || "",
      user.password
    );

    if (!passwordValidation) {
      return res.status(404).json({
        message: "User is not Registered",
      });
    }

    const age = 1000 * 24 * 60 * 60 * 7;

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET_KEY!,
      { expiresIn: age }
    );

    if (!token) {
      return res.status(404).json({
        message: "Problem in generating the token",
      });
    }

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: age,
      })
      .status(200)
      .json({ userId: user.id });
  } catch (error) {
    return res.status(404).json({
      error: "Login Unsuccessful",
    });
  }
};

export const logout = (req: Request, res: any) => {
  return res
    .clearCookie("token")
    .status(200)
    .json({ message: "Logout Successful" });
};
