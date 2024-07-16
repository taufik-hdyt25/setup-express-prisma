import { Router } from "express";
import routerUser from "./userRoutes";

const router = Router();

// route user
router.use(routerUser);

// route product ex
// router.use(routerUser);

export default router;
