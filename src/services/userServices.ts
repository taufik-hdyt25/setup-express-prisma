import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUsers = async () => {
  return await prisma.user.findMany();
};

export const getUsersByEmail = async (email:string) => {
  return await prisma.user.findUnique({
    where: {
      email:email
    }
  });
};

export const createUser = async (name: string, email: string) => {
  return await prisma.user.create({
    data: { name, email },
  });
};
