import express from 'express'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Router } from 'express'

import { user } from '../models/userModel'
import { generateToken, generateRefreshToken } from '../utils/createToken'

export const router = Router()

router.post("/auth/register", async (req, res) => {
  const { name, email, pass, active, rol } = req.body;
  try {
    let userQuery = await user.findOne({ email });
    if (!userQuery) {
      new user({ name: name, email: email, pass: pass, active: active, rol: rol })
        .save()
        .then((data) => res.status(201).json({
          ok: `El usuario ${data.email} ha sido creado correctamente`
        }))
        .catch((error) => console.log(error));
    } else {
      res.status(409).json({
        Conflicto: "Está intentando registrar un mail que ya existe"
      })
    }
  } catch (error) {
    res.status(500).json({
      Error: "Se ha producido un error interno, por favor contacte con el administrador"
    })
  }
});

router.post("/auth/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const userQuery = await user.findOne({ email });
    if (!userQuery) {
      return res.status(403).json({ error: "email not found" });
    }

    const cPassword = await bcrypt.compare(pass, userQuery.pass);
    if (!cPassword) {
      return res.status(403).json({ error: "invalid Password" });
    }

    const data = generateToken(userQuery._id);
    const token = data?.token
    const expiresIn = data?.expiresIn
    console.log({ messagge: "Login OK", token, expiresIn })
    generateRefreshToken(userQuery.id, res)

    return res.status(200).json({ messagge: "Login OK", token, expiresIn });
  } catch (error) {
    console.log(error);
  }
});

router.get("/refresh", (req, res) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken
    console.log("La cookie almacenada: ", refreshTokenCookie)
    if (!refreshTokenCookie) throw new Error('Not exist refreshTokenCookie')

    const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH!) as JwtPayload;

    const data = generateToken(uid);
    const token = data?.token
    const expiresIn = data?.expiresIn
    return res.status(200).json({ token, expiresIn })

  } catch (error) {
    console.log(error)
    return res.status(401).json({
      Error: "El refresh no existe"
    })
  }
})