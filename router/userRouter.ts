import { Router } from "express";
import {
  createUser,
  getOneUser,
  getUser,
  signInUser,
  verifyUser,
} from "../controller/userController";

const router: Router = Router();
router.route("/create-user").post(createUser);
router.route("/signin-user").post(signInUser);
router.route("/verify-user").patch(verifyUser);
router.route("/get-user").get(getUser);
router.route("/get-one-user/:userId").get(getOneUser);

export default router;
