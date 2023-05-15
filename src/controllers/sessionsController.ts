import { Request, Response } from "express";
import { connection } from "../database/knex/index";
import AppError from "../utils/appError";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { authConfig } from "../config/auth";

export default class SessionsController {
  async create(request: Request, response: Response) {
    const { email, password } = request.body;
    const user = await connection("users").where({ email }).first();
    if (!user) {
      throw new AppError("Email or Password incorrect", 401);
    }
    const matchPassword = await compare(password, user.password);
    if (!matchPassword) {
      throw new AppError("Email or Password incorrect", 401);
    }
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });
    return response.json({ user, token });
  }
}
