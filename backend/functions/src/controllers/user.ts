import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User,{UserInterface} from "../models/User.js";
import jwt from "jsonwebtoken";
import * as admin from "firebase-admin";
import { Roles } from "src/models/User.js";

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

    // Create Firebase user
    const { uid } = await admin.auth().createUser({
      displayName,
      password,
      email,
    });

    // Set custom user claims
    await admin.auth().setCustomUserClaims(uid, { role });

    console.log(uid);
    // Create a new user with the provided data
    const userRole: UserInterface = new User({
      displayName,
      email,
      password,
      role,
      uid: uid,
    }); 

    // Save the user to the database
    try {
      // Code pour sauvegarder l'utilisateur dans MongoDB
      await userRole.save();
      console.log("Utilisateur enregistré dans MongoDB avec succès.");
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'utilisateur dans MongoDB :", error);
    }

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
    console.log(listUsers)
    const users = listUsers.users.map(user => mapUser(user))
    console.log(mapUser)
    res.status(200).send({ users })
  } catch (err) {
    handleError(res, err)
  }
}

export const mapUser = (user: admin.auth.UserRecord) => {
  const customClaims = (user.customClaims || { role: "" }) as { role?: Roles }
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

export const patch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { displayName, email, role } = req.body;

    if (!id || !displayName || !email || !role) {
      res.status(400).send({ message: "Missing fields" });
      return res;
    }

    // Update user in Firebase
    await admin.auth().updateUser(id, { displayName, email });
    await admin.auth().setCustomUserClaims(id, { role });
    const firebaseUser = await admin.auth().getUser(id);

    // Update user in MongoDB
    const updatedUser = await User.findOneAndUpdate(
      { uid: id },
      { displayName, email, role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found in MongoDB" });
    }

    let message = "User updated successfully in MongoDB";
    if (firebaseUser) {
      message += " and Firebase";
    }

    return res.status(200).send({ message, user: mapUser(firebaseUser) });
  } catch (err) {
    handleError(res, err);
    return res;
  }
}

export const patchMdp = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!id || !password) {
      res.status(400).send({ message: "Missing fields" });
      return res;
    }

    // Update user in Firebase
    await admin.auth().updateUser(id, { password });
    const firebaseUser = await admin.auth().getUser(id);

    // Update user in MongoDB
    const updatedUser = await User.findOneAndUpdate(
      { uid: id },
      { password },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found in MongoDB" });
    }

    let message = "User updated successfully in MongoDB";
    if (firebaseUser) {
      message += " and Firebase";
    }

    return res.status(200).send({ message, user: mapUser(firebaseUser), password });
  } catch (err) {
    handleError(res, err);
    return res;
  }
}

export const remove = async(req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Delete user in Firebase
    await admin.auth().deleteUser(id).catch((firebaseError) => {
      console.error("Error deleting user in Firebase:", firebaseError);
      return res.status(404).send({ message: "Error deleting user in Firebase" });
    });

    // Delete user in MongoDB
    const deletedUser = await User.findOneAndDelete({ uid: id });

    if (!deletedUser) {
      return res.status(404).send({ message: "User not found in MongoDB" });
    }

    return res.status(200).send({ message: "User deleted successfully in MongoDB and Firebase"});
  } catch (err) {
    console.error("Error deleting user:", err);
    return res.status(500).send({ message: "Internal server error" });
  }
}


export const handleError = async(res: Response, err: any) => {
  return res.status(500).send({ message: `${err.code} - ${err.message}` });
}