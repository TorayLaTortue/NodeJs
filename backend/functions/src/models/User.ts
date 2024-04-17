import { Schema, model, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export interface UserInterface extends Document {
  displayName: string;
  email: string;
  password: string;
  role: string;
  uid: string;
}

const userSchema: Schema = new Schema({
  displayName: {type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {type: String, required: true, },
  uid: {type: String, required: true, unique: true}
});
// doc role
userSchema.plugin(uniqueValidator);
export default model<UserInterface>("User", userSchema);
