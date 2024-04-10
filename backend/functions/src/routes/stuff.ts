import { Application } from "express";
// import auth from "../middleware/auth.js";
import * as stuffCtrl from "../controllers/stuff.js";

// eslint-disable-next-line new-cap
// const router: Router = express.Router();

/**
 * ## Stuff Routes
 * @param {Application} app: Main expresse app process
 */
export const stuffRoutes = (app: Application) => {
  app.get("/stuff"/* , auth */, stuffCtrl.getAllStuff);
  app.post("/stuff"/* , auth */, stuffCtrl.createThing);
  app.get("/stuff/:id"/* , auth */, stuffCtrl.getOneThing);
  app.put("/stuff/:id"/* , auth */, stuffCtrl.modifyThing);
  app.delete("/stuff/:id"/* , auth */, stuffCtrl.deleteThing);
}

export default stuffRoutes;
