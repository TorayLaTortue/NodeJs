import { onRequest, HttpsFunction } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { initializeApp } from "firebase-admin/app";
import * as mongoose from "mongoose";
import express, { Request, Response, NextFunction } from "express";
import stuffRoutes from "./routes/stuff.js";
import userRoutes from "./routes/user.js";
import * as dotenv from "dotenv";

dotenv.config();

initializeApp();

const app: express.Application = express();

const mongodbUrl: string | undefined = process.env.MONGODB_URL;

if (!mongodbUrl) {
  throw new Error("MONGODB_URL is not defined");
}

mongoose
  .connect(mongodbUrl, {
    /* empty */
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());
 
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  next();
});

app.use(express.json());

app.use("/api/stuff.js", stuffRoutes);
app.use("/api/auth.js", userRoutes);

const api: HttpsFunction = onRequest((request: Request, response: Response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

export { api };
