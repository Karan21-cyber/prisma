import { Request, Response } from "express";
import prisma from "../prisma";
import asyncHandler from "../utils/asyncHandler";
import HttpException from "../utils/HttpException";

const createMember = asyncHandler(async (req: Request, res: Response) => {
  const resBody = req.body;
  const email = resBody.email.trim().toLowerCase();
  const alreadyExist = await prisma.member.findUnique({ where: { email } });

  if (alreadyExist) throw new HttpException("Member Email already Exist.", 400);

  await prisma.member.create({ data: { ...resBody, email } });
  return res.status(201).json({
    success: true,
    message: "Member created successfully.",
  });
});

const updateMember = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.body;
  const { id } = req.params;
  await prisma.member.update({ where: { id }, data: { name } });
  return res.status(200).json({
    success: true,
    message: "Member updated successfully.",
  });
});

const getMembers = asyncHandler(async (req: Request, res: Response) => {
  const members = await prisma.member.findMany({
    select: {
      name: true,
      email: true,
      address: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return res.status(200).json({
    status: 200,
    success: true,
    message: "Members fetched successfully.",
    total: members.length,
    data: members,
  });
});

const getMemberById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const singleMember = await prisma.member.findFirst({
    where: { id: id },
  });
});

const deleteMember = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.member.delete({ where: { id } });
  return res.status(200).json({
    success: true,
    message: "Member deleted successfully.",
  });
});

const memberController = {
  createMember,
  updateMember,
  getMembers,
  getMemberById,
  deleteMember,
};

export default memberController;
