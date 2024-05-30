import express, { Application } from "express";
import * as userCtrl from "../controllers/user.js";
import { isAuthenticated } from "../middleware/authenticated.js";
import { isAuthorized } from "../middleware/authorized.js";
import { Roles } from "../models/User.js";


// eslint-disable-next-line new-cap
// const router: Router = express.Router();

/**
 * ## User Routes
 * @param {Application} app: Main expresse app process
 */
export const userRoutes = (app: Application) => {
  // eslint-disable-next-line new-cap
  const userRouter = express.Router();
  
  userRouter.use(isAuthenticated);


  app.post("/signup", userCtrl.signup);
  app.post("/login", userCtrl.login);

  userRouter.post("/", [
    isAuthorized({ hasRole: [Roles.admin, Roles.manager] }),
    userCtrl.create
  ]);

  userRouter.get("/", [
    isAuthorized({ hasRole: [Roles.admin, Roles.manager] }),
    userCtrl.all
  ]);

  // get :id user
  userRouter.get("/:id", [
    isAuthorized({ hasRole: [Roles.admin, Roles.manager], allowSameUser: true }),
    userCtrl.get
  ]);
  
  // updates :id user
  userRouter.put("/admin/:id", [
    isAuthorized({ hasRole: [Roles.admin, Roles.manager], allowSameUser: true }),
    userCtrl.patch
  ]);

  // updates :id user (only name, photo and email)
  userRouter.put("/:id", [
    isAuthorized({ hasRole: [Roles.admin, Roles.manager], allowSameUser: true }),
    userCtrl.UpdateUser
  ]);

  // updates Mdp :id user
  userRouter.put("/password/:id", [
    isAuthorized({ hasRole: [Roles.admin, Roles.manager], allowSameUser: true }),
    userCtrl.patchMdp
  ]);

  // deletes :id user
  userRouter.delete("/:id", [
    isAuthorized({ hasRole: [Roles.admin, Roles.manager] }),
    userCtrl.remove
  ]);

  app.use("/users", userRouter);
}

/**
 * ## routes Config
 * @param {Application} app: Main expresse app process
 */
/* export function routesConfig(app: Application) {
}

export default routesConfig;*/
