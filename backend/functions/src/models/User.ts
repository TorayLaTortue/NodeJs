import { Schema, model, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export interface UserInterface extends Document {
  email: string;
  password: string;
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);
export default model<UserInterface>("User", userSchema);
