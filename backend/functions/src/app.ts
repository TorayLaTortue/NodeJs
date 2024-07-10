import { onRequest } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";
import * as mongoose from "mongoose";
import express from "express";
import stuffRoutes from "./routes/stuff.js";
import * as dotenv from "dotenv";
import { userRoutes } from "./routes/user.js";
import cors from "cors";
import * as bodyParser from "body-parser";

dotenv.config();

const app: express.Application = express();

app.use(bodyParser.json());
app.use(cors({ origin: true }));
app.options("*", cors());

const mongodbUrl: string | undefined = process.env.MONGODB_URL;

if (!mongodbUrl) {
  throw new Error("MONGODB_URL is not defined");
}

initializeApp();



mongoose
  .connect(mongodbUrl, {
    /* empty */
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());
 
stuffRoutes(app);
userRoutes(app);

export const api = onRequest(app);