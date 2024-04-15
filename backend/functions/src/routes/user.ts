import { Application } from "express";
import * as userCtrl from "../controllers/user.js";
import { isAuthenticated } from "../middleware/authenticated.js";
import { isAuthorized } from "../middleware/authorized.js";

// eslint-disable-next-line new-cap
// const router: Router = express.Router();


/**
 * ## User Routes
 * @param {Application} app: Main expresse app process
 */
export const userRoutes = (app: Application) => {
  app.post("/signup", userCtrl.signup);
  app.post("/login", userCtrl.login);
  
  app.get("/allUser", userCtrl.getAllUsers);

  app.post("/create",
    userCtrl.create,
    isAuthenticated,
    isAuthorized({ hasRole: ["admin", "manager"] }),);

  app.get("/users", [
    isAuthenticated,
    isAuthorized({ hasRole: ["admin", "manager"] }),
    userCtrl.all]);

  // get :id user
  app.get("/users/:id", [
    isAuthenticated,
    isAuthorized({ hasRole: ["admin", "manager"], allowSameUser: true }),
    userCtrl.get]);

  // updates :id user
  app.patch("/users/:id", [
    isAuthenticated,
    isAuthorized({ hasRole: ["admin", "manager"], allowSameUser: true }),
    userCtrl.patch]);

  // deletes :id user
  app.delete("/users/:id", [
    isAuthenticated,
    isAuthorized({ hasRole: ["admin", "manager"] }),
    userCtrl.remove]);
}

/**
 * ## routes Config
 * @param {Application} app: Main expresse app process
 */
/* export function routesConfig(app: Application) {
}

export default routesConfig;*/
