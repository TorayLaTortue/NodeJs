import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User,{UserInterface} from "../models/User.js";
import jwt from "jsonwebtoken";
import * as admin from "firebase-admin";

export const signup = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ message: "Utilisateur créé !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const login = (
  req: Request,
  res: Response,
): void => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.status(401).json({ error: "Utilisateur non trouvé !" });
        return;
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            res.status(401).json({ error: "Mot de passe incorrect !" });
            return;
          }
          const token = jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
            expiresIn: "24h",
          });
          res.status(200).json({
            userId: user._id,
            token: token,
          });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};


// { displayName: string, password: string, email: string, role: string }
export const create = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { displayName, password, email, role } = req.body;

    // Check if any required field is missing
    if (!displayName || !password || !email || !role) {
    res.status(400).send({ message: "Missing fields" });
    }

    // Create a new user with the provided data
    const userRole: UserInterface = new User({
      displayName,
      email,
      password,
      role,
    });

    // Save the user to the database
    await userRole.save();

    // Create Firebase user
    const { uid } = await admin.auth().createUser({
      displayName,
      password,
      email,
    });

    // Set custom user claims
    await admin.auth().setCustomUserClaims(uid, { role });

    // Send success response
    res.status(201).json({
      message: "Post saved successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};



export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: UserInterface[] = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error"});
  }
};


export const all = async (req: Request, res: Response): Promise<void> => {
  try {
    const listUsers = await admin.auth().listUsers()
    const users = listUsers.users.map(mapUser)
    res.status(200).send({ users })
  } catch (err) {
    handleError(res, err)
  }
}

export const mapUser = async (user: admin.auth.UserRecord) => {
  const customClaims = (user.customClaims || { role: "" }) as { role?: string }
  const role = customClaims.role ? customClaims.role : ""
  return {
    uid: user.uid,
    email: user.email || "",
    displayName: user.displayName || "",
    role,
    lastSignInTime: user.metadata.lastSignInTime,
    creationTime: user.metadata.creationTime
  }
}

export const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await admin.auth().getUser(id)
    return res.status(200).send({ user: mapUser(user) })
  } catch (err) {
    return handleError(res, err)
  }
}

export async function patch(req: Request, res: Response) {
   try {
       const { id } = req.params
       const { displayName, password, email, role } = req.body

       if (!id || !displayName || !password || !email || !role) {
           return res.status(400).send({ message: "Missing fields" })
       }

       await admin.auth().updateUser(id, { displayName, password, email })
       await admin.auth().setCustomUserClaims(id, { role })
       const user = await admin.auth().getUser(id)

       return res.status(204).send({ user: mapUser(user) })
   } catch (err) {
       return handleError(res, err)
   }
}

export async function remove(req: Request, res: Response) {
   try {
       const { id } = req.params
       await admin.auth().deleteUser(id)
       return res.status(204).send({})
   } catch (err) {
       return handleError(res, err)
   }
}


function handleError(res: Response, err: any) {
  return res.status(500).send({ message: `${err.code} - ${err.message}` });
}