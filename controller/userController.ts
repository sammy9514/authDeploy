import { Request, Response } from "express";
import bcrypt, { genSalt } from "bcrypt";
import crypto from "crypto";
import userModel from "../model/userModel";
import jwt from "jsonwebtoken";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;

    const generateSalt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, generateSalt);

    const token = crypto.randomBytes(3).toString("hex");

    const user = await userModel.create({
      userName,
      email,
      password: hashed,
      verificationToken: token,
      avatar: userName.charAt(0),
    });

    res.status(200).json({
      message: "created",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      message: "failed",
    });
  }
};

export const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (user) {
      const passCheck = await bcrypt.compare(password, user.password);

      if (passCheck) {
        if (user.verified && user.verificationToken === "") {
          const webToken = jwt.sign({ id: user._id }, "justAcode", {
            expiresIn: "2d",
          });

          res.status(200).json({
            message: "verified ",
            data: webToken,
          });
        } else {
          res.status(404).json({
            message: "go and verify your account",
          });
        }
      }
    } else {
      res.status(404).json({
        message: "check password and try again",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "failed to signin",
    });
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  try {
    const { email, token } = req.body;

    const getEmail = await userModel.findOne({ email });
    const getToken = await userModel.findOne({ verificationToken: token });

    if (getToken && getEmail) {
      await userModel.findByIdAndUpdate(
        getEmail._id,
        { verificationToken: "", verified: true },
        { new: true }
      );

      res.status(200).json({
        message: "verified",
      });
    } else {
      res.status(404).json({
        message: "token/ email isn't correct",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "verification failed",
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.find();

    res.status(200).json({
      message: "done",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      message: "failed to get users",
    });
  }
};

export const getOneUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await userModel.findById(userId);
    res.status(200).json({
      message: "user found ",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      message: "failed to get user",
    });
  }
};
