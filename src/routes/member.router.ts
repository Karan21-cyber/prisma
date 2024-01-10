import { Router } from "express";
import memberController from "../controllers/member.controller";

const router = Router();

router.post("/v1/member/create", memberController.createMember);
router.get("/v1/member/list", memberController.getMembers);
router.put("/v1/member/update/:id", memberController.updateMember);
router.get("/v1/member/:id", memberController.getMemberById);
router.delete("/v1/member/delete/:id", memberController.deleteMember);

const memberRouter = router;
export default memberRouter;
