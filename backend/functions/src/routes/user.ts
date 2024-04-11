import { Application } from "express";
import * as userCtrl from "../controllers/user.js";

// eslint-disable-next-line new-cap
// const router: Router = express.Router();


/**
 * ## User Routes
 * @param {Application} app: Main expresse app process
 */
export const userRoutes = (app: Application) => {
    app.post("/signup", userCtrl.signup);
    app.post("/login", userCtrl.login);
    app.post("/create",userCtrl.create);
    app.get("/allUser", userCtrl.getAllUsers);
  }

  /**
 * ## routes Config
 * @param {Application} app: Main expresse app process
 */
/*export function routesConfig(app: Application) {
}

export default routesConfig;*/
