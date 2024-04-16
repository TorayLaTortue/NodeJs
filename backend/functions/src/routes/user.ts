import { Application } from "express";
import * as userCtrl from "../controllers/user.js";
import { isAuthenticated } from "../middleware/authenticated.js";
import { isAuthorized } from "../middleware/authorized.js";

// eslint-disable-next-line new-cap
// const router: Router = express.Router();

export enum Roles {
  admin = "admin",
  manager ="manager",
  user ="user"
}

/**
 * ## User Routes
 * @param {Application} app: Main expresse app process
 */
export const userRoutes = (app: Application) => {
  app.post("/signup", userCtrl.signup);
  app.post("/login", userCtrl.login);
  
  // app.get("/allUser", userCtrl.getAllUsers);

  app.post("/users", [
    isAuthenticated,
    isAuthorized({ hasRole: [Roles.admin, Roles.manager] }),
    userCtrl.create
  ]);

  app.get("/users", [
    // isAuthenticated,
    // isAuthorized({ hasRole: [Roles.admin, Roles.manager] }),
    userCtrl.all
  ]);

  // get :id user
  app.get("/users/:id", [
    isAuthenticated,
    isAuthorized({ hasRole: [Roles.admin, Roles.manager], allowSameUser: true }),
    userCtrl.get
  ]);

  // updates :id user
  app.patch("/users/:id", [
    isAuthenticated,
    isAuthorized({ hasRole: [Roles.admin, Roles.manager], allowSameUser: true }),
    userCtrl.patch
  ]);

  // deletes :id user
  app.delete("/users/:id", [
    isAuthenticated,
    isAuthorized({ hasRole: [Roles.admin, Roles.manager] }),
    userCtrl.remove
  ]);
}

/**
 * ## routes Config
 * @param {Application} app: Main expresse app process
 */
/* export function routesConfig(app: Application) {
}

export default routesConfig;*/
