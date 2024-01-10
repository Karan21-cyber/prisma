import { Router } from "express";
import authcontroller from "../controllers/auth.controller";

const router = Router();

router.post("/v1/auth/login", authcontroller.login);

const authRouter = router;

export default authRouter;
