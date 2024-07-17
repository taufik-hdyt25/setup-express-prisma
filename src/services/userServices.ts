import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async () => {
  return await prisma.users.findMany();
};

export const getUsersByEmail = async (email: string) => {
  return await prisma.users.findUnique({
    where: {
      email: email,
    },
  });
};
export const getUsersById = async (id: number) => {
  return await prisma.users.findUnique({
    where: {
      id: id,
    },
  });
};

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  return await prisma.users.create({
    data: { name, email, password },
  });
};

export const deleteUser = async (id: number) => {
  return await prisma.users.delete({
    where: {
      id: id,
    },
  });
};
