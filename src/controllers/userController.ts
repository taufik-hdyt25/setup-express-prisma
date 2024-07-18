import { Request, Response } from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  getUsersByEmail,
  getUsersById,
} from "../services/userServices";
import * as bycript from "bcrypt";
import * as jwt from "jsonwebtoken";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    return res.status(200).json({
      data: users,
      message: "Success get data",
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch users" });
  }
};
export const getUserQuery = async (req: Request, res: Response) => {
  try {
    const { email, id } = req.query;
    if (email) {
      const userByEmail = await getUsersByEmail(String(email));
      if (!userByEmail) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      return res.status(200).json({
        data: userByEmail,
        message: "Success get data",
      });
    } else if (id) {
      const userById = await getUsersById(Number(id));
      if (!userById) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      return res.status(200).json({
        data: userById,
        message: "Success get data",
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch users by email" });
  }
};

export const addUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    // cek email jika ada
    const checkEmail = await getUsersByEmail(email);
    if (checkEmail)
      return res.status(400).json({
        message: "email sudah terdaftar",
      });

    const passwordHash = await bycript.hash(password, 10);

    const user = await createUser(name, email, passwordHash);
    return res.status(200).json({
      data: user,
      message: "Create Success",
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create user" });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idParam = parseInt(id);
    const checkUser = await getUsersById(idParam);
    if (!checkUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    await deleteUser(idParam);
    return res.status(200).json({
      message: "Berhasil di hapus",
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email)
      return res.status(400).json({ message: "email tidak boleh kosong" });
    if (!password)
      return res.status(400).json({ message: "password tidak boleh kosong" });

    const checkEmail = await getUsersByEmail(email);

    if (!checkEmail)
      return res.status(404).json({ message: "akun tidak di temukan" });
    const isPassword = await bycript.compare(password, checkEmail.password);
    if (!isPassword)
      return res.status(400).json({
        message: "Password wrong",
      });
    const token = jwt.sign(
      { id: checkEmail.id },
      process.env.SECRET_KEY as string,
      {
        expiresIn: 5000000,
      }
    );

    return res.status(200).json({
      code: 201,
      status: "success",
      email: checkEmail.email,
      name: checkEmail.name,
      message: "Login Success",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

export const profile = async (req: Request, res: Response) => {
  try {
    const loginSession = res.locals.auth;
    const user = await getUsersById(loginSession.id);
    if (!user)
      return res.status(400).json({
        message: "user not found",
      });

    return res.status(200).json({
      message: "success get profile",
      id: user.id,
      email: user.email,
      name: user.name,
    });

    // const checkUser = await getUsersById()
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};
