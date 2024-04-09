import * as express from "express"; // Warn
import { Router } from "express";
import auth from "../middleware/auth";
import * as stuffCtrl from "../controllers/stuff";

const router: Router = express.router();

router.get("/", auth, stuffCtrl.getAllStuff);
router.post("/", auth, stuffCtrl.createThing);
router.get("/:id", auth, stuffCtrl.getOneThing);
router.put("/:id", auth, stuffCtrl.modifyThing);
router.delete("/:id", auth, stuffCtrl.deleteThing);

export default router;
