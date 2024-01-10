import { Request, Response } from "express";
import prisma from "../prisma";
import asyncHandler from "../utils/asyncHandler";
import bcrypt from "bcrypt";
import HttpException from "../utils/HttpException";
import jwt from "jsonwebtoken";

const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user_email = email.trim().toLowerCase();

  const userLogin = await prisma.user.findUnique({
    where: { email: user_email },
  });

  if (!userLogin) throw new HttpException("User Not Found!.", 400);

  const isMatch = await bcrypt.compare(password, userLogin.password);

  if (!isMatch) throw new HttpException("Invalid Credentials.", 400);

  // creating a token
  const jwtToken = jwt.sign(
    {
      id: userLogin.id,
      email: userLogin.email,
    },
    "PRACTISE" as string,
    {
      expiresIn: "1d",
    }
  );

  // user by id and add update token
  const updateUser = await prisma.user.update({
    where: { id: userLogin.id },
    data: { token: jwtToken },
  });

  return res.status(200).json({
    success: true,
    message: "Login Successfully.",
    data: {
      id: updateUser.id,
      email: updateUser.email,
      token: updateUser.token,
    },
  });
});

const authcontroller = { login };
export default authcontroller;
