import { Schema, model, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export enum Roles {
  admin = "admin",
  manager ="manager",
  user ="user"
}

export interface UserInterface extends Document {
  displayName: string;
  email: string;
  password: string;
  role: Roles; 
  uid: string;
}

const userSchema: Schema = new Schema({
  displayName: {type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {type: String, required: true, enum: Object.values(Roles) },
  uid: {type: String, required: true, unique: true}
});

userSchema.plugin(uniqueValidator);
export default model<UserInterface>("User", userSchema);
