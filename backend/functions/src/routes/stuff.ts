import * as express from "express";
import { Router } from "express";
import auth from "../middleware/auth.js";
import * as stuffCtrl from "../controllers/stuff.js";

// eslint-disable-next-line new-cap
const router: Router = express.Router();

router.get("/", auth, stuffCtrl.getAllStuff);
router.post("/", auth, stuffCtrl.createThing);
router.get("/:id", auth, stuffCtrl.getOneThing);
router.put("/:id", auth, stuffCtrl.modifyThing);
router.delete("/:id", auth, stuffCtrl.deleteThing);

export default router;
