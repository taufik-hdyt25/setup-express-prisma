import { Router } from "express";
import {
  addUser,
  deleteUserById,
  getAllUsers,
  getUserQuery,
  login,
  profile,
} from "../controllers/userController";
import jwtAuth from "../middlewares/jwtauth";

const routerUser = Router();

routerUser.get("/users", getAllUsers);
routerUser.get("/user", getUserQuery);
routerUser.post("/users", addUser);
routerUser.delete("/user/:id", deleteUserById);

// Auth
routerUser.post("/auth/login", login);
routerUser.get("/auth/me", jwtAuth, profile);

export default routerUser;
