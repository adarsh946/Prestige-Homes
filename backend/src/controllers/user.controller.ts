import prisma from "../lib/db.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req: any, res: any) => {
  try {
    const allUsers = await prisma.user.findMany();
    console.log(allUsers);
    if (!allUsers) {
      return res.status(404).json({
        message: "Unable to fetch users",
      });
    }

    return res.status(200).json({ allUsers });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "Users not found",
    });
  }
};

export const getUser = async (req: any, res: any) => {
  const id = req.params.id;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "user not found",
    });
  }
};

export const updateUser = async (req: any, res: any) => {
  const id = req.params.id;
  const tokenId = req.userId;
  const { password, avatar, ...inputs } = req.body;

  if (id !== tokenId) {
    return res.status(404).json({
      message: "Invalid User",
    });
  }
  let updatedPassword = null;
  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });
    if (!user) {
      return res.status(404).json({
        message: "unable to update the user",
      });
    }

    const { password: userPassword, ...restInfo } = user;

    res.status(200).json(restInfo);
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "not able to update the user",
    });
  }
};
