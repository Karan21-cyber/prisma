import { Router } from "express";
import userController from "../controllers/user.controllers";
import validate from "../middleware/validation.middleware";
import { UpdateUserSchema, UserCreateSchema } from "../validator/user.validator";

const router = Router();

router.post("/v1/user/create",validate(UserCreateSchema), userController.createUser);
router.get("/v1/user/list", userController.getUser);
router.get("/v1/user/:id", userController.getUserById);
router.put("/v1/user/update/:id", validate(UpdateUserSchema),userController.updateUserId);
router.delete("/v1/user/delete/:id", userController.deleteUser);

const userRouter = router;

export default userRouter;

