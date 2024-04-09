import { Request, Response } from "express";
import Thing, { ThingInterface } from "../models/Thing";

export const createThing = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const thing: ThingInterface = new Thing({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      userId: req.body.userId,
    });
    await thing.save();
    res.status(201).json({
      message: "Post saved successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

export const getOneThing = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const thing: ThingInterface | null = await Thing.findOne({
      _id: req.params.id,
    });
    if (thing) {
      res.status(200).json(thing);
    } else {
      res.status(404).json({
        error: "Thing not found",
      });
    }
  } catch (error) {
    res.status(404).json({
      error: error,
    });
  }
};

export const modifyThing = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const thingToUpdate: Partial<ThingInterface> = {
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      userId: req.body.userId,
    };
    await Thing.updateOne({ _id: req.params.id }, thingToUpdate);
    res.status(201).json({
      message: "Thing updated successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

export const deleteThing = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await Thing.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "Deleted!",
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

export const getAllStuff = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const things: ThingInterface[] = await Thing.find();
    res.status(200).json(things);
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};
