import { Schema, model, Document } from "mongoose";

export interface ThingInterface extends Document {
  title: string;
  description: string;
  imageUrl: string;
  userId: string;
  price: number;
}

const thingSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: false },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

export default model<ThingInterface>("Thing", thingSchema);
