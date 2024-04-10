import * as express from "express";
import { Router } from "express";
import * as userCtrl from "../controllers/user.js";

// eslint-disable-next-line new-cap
const router: Router = express.Router();

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

export default router;
