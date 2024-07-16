import { Router } from "express";
import {
  getAllUsers,
  addUser,
  getUserByEmails,
} from "../controllers/userController";

const routerUser = Router();

routerUser.get("/users", getAllUsers);
routerUser.get("/user/:email", getUserByEmails);
routerUser.post("/users", addUser);

export default routerUser;
