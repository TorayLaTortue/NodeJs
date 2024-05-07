import { onRequest } from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";
import { initializeApp } from "firebase-admin/app";
import * as mongoose from "mongoose";
import express from "express";
import stuffRoutes from "./routes/stuff.js";
// import userRoutes from "./routes/user.js";
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
 
/* app.use((req: Request, res: Response, next: NextFunction) => {
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
}); */

// app.use(express.json());
stuffRoutes(app);
userRoutes(app);
// app.use("/api/auth", userRoutes);

export const api = onRequest(app/* (request: Request, response: Response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
} */);