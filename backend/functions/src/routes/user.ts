import * as express from "express";
import { Router } from "express";
import * as userCtrl from "../controllers/user";

const router: Router = express.router();

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

export default router;
