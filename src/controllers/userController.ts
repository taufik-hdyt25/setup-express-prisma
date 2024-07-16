import { Request, Response } from 'express';
import { createUser, getUsers, getUsersByEmail } from '../services/userServices';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    return res.json({
      data: users,
      message:"Success get data"
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch users' });
  }
};
export const getUserByEmails = async (req: Request, res: Response) => {
  try {
    const {email} = req.params
    const userByEmail = await getUsersByEmail(email);
    if(!userByEmail){
      return res.json({
        message: "User not found"
      })
    }
    return res.json({
      data: userByEmail,
      message:"Success get data"
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const addUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const user = await createUser(name, email);
    return res.json({
      data: user,
      message:"Create Succes"
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create user' });
  }
};
