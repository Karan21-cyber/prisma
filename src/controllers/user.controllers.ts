import { Request, Response } from "express";
import prisma from "../prisma";
import asyncHandler from "../utils/asyncHandler";
import HttpException from "../utils/HttpException";
import bcrypt from "bcrypt";

const createUser = asyncHandler(async (req: Request, res: Response) => {
  const resBody = req.body;
  const email = resBody.email.trim().toLowerCase();

  const alreadyExist = await prisma.user.findUnique({
    where: { email },
  });

  // if exist then throw error
  if (alreadyExist) throw new HttpException("Email already Exist.", 400);

  // hashing the password
  const password = await bcrypt.hash(resBody.password, 10);

  //create new user
  await prisma.user.create({
    data: { ...resBody, email, password, address: resBody.address },
  });

  return res.status(201).json({
    success: true,
    message: "User created successfully.",
  });
});

const getUser = asyncHandler(async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      address: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return res.status(200).json({
    status: 200,
    success: true,
    message: "User fetched successfully.",
    total: users.length,
    data: users,
  });
});

const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const singleUser = await prisma.user.findFirst({
    where: { id: id },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return res.status(200).json({
    status: 200,
    success: true,
    message: "User fetched successfully.",
    data: singleUser,
  });
});

const updateUserId = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.body;
  const { id } = req.params;

  if (req.body.email)
    throw new HttpException("Required Fields are : {name}", 400);

  await prisma.user.update({
    where: { id: id },
    data: { name, address: req.body.address || "" },
  });

  return res.status(200).json({
    status: 201,
    success: true,
    message: "User updated successfully.",
  });
});

const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.user.delete({
    where: { id: id },
  });
  return res.status(200).json({
    success: true,
    status: 200,
    message: "User deleted successfully.",
  });
});

const UserController = {
  createUser,
  getUser,
  getUserById,
  updateUserId,
  deleteUser,
};
export default UserController;
