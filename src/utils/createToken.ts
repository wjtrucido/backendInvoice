import { Response } from 'express'
import { Types } from 'mongoose';
const jwt = require("jsonwebtoken");
const privateKey = process.env.PRIVATE_KEY;
const expiresIn: number = 60 * 5;
const expiresInRefreshToken = 60 * 60 * 24 * 30;

export const generateToken = (id: Types.ObjectId) => {
  try {
    const token = jwt.sign({ uid: id }, privateKey, { expiresIn });
    console.log(token);
    return { token, expiresIn };
  } catch (error) {
    console.log(error);
  }
};

export const generateRefreshToken = (id: Types.ObjectId, res: Response) => {
  const expiresIn = 60 * 60 * 24 * 30;
  try {
    const refreshToken = jwt.sign({ uid: id }, process.env.JWT_REFRESH, { expiresIn })
    console.log(refreshToken);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: !(process.env.MODO === "developer"),
      expires: new Date(Date.now() + expiresIn * 1000)
    })
  } catch (error) {
    console.log(error);
  }
}