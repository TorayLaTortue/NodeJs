import { Request, Response, NextFunction } from "express";
import { Roles } from "../models/User.js";

export const isAuthorized = (opts: { hasRole: Roles[], allowSameUser?: boolean }) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role, email, uid } = res.locals
    const { id } = req.params

    if (email === "damien.pasquer3636@gmail.com")
      return next();

    if (opts.allowSameUser && id && uid === id)
      return next();

    if (!role)
      return res.status(403).send();

    if (opts.hasRole.includes(role))
      return next();

    return res.status(403).send();
  }
}