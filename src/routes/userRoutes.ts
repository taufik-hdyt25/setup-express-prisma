import { Router } from "express";
import {
  addUser,
  deleteUserById,
  getAllUsers,
  getUserQuery,
  login,
  profile,
} from "../controllers/userController";
import auth from "../middlewares/jwtauth";

const routerUser = Router();

routerUser.get("/users", auth, getAllUsers);
routerUser.get("/user", getUserQuery);
routerUser.delete("/user/:id", deleteUserById);

// Auth
routerUser.post("/users", addUser);
routerUser.post("/auth/login", login);
routerUser.get("/auth/me", auth, profile);

export default routerUser;
