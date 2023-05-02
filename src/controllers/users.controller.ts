import { Request, Response } from "express";
import AppError from "../utils/appError";
import { compare, hash } from "bcrypt";
import { connection } from "../database/knex/index";

export class UserController {
  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;
    console.log(name, email, password);

    console.log("aqui antes de dar merda");
    const checkUserExists = await connection
      .select("*")
      .from("users")
      .where("email", email);
    if (checkUserExists.length > 0) {
      throw new AppError("Este email ja esta em uso", 400);
    }
    const hashedPassword = await hash(password, 8);
    const user_id = await connection("users").insert({
      name,
      email,
      password: hashedPassword,
    });
    response.status(201).json({ message: "Usuario criado com sucesso" });
  }

  async update(request: Request, response: Response) {
    const { name, email, password, old_password } = request.body;
    const { user_id } = request.params;
    console.log(name, email, password, old_password, user_id);
    const checkUserExists = await connection
      .select("*")
      .from("users")
      .where("id", user_id)
      .first();
    console.log(checkUserExists);
    if (!checkUserExists) {
      throw new AppError("Usuario nao encontrado", 404);
    }
    const newEmailAlreadyExists = await connection
      .select("*")
      .from("users")
      .where("email", email)
      .first();
    console.log(newEmailAlreadyExists);
    if (newEmailAlreadyExists && newEmailAlreadyExists.id !== user_id) {
      throw new AppError("Este email ja esta em uso", 400);
    }
    if (password && !old_password) {
      throw new AppError("Voce precisa inserir sua senha antiga", 404);
    }
    if (password && old_password) {
      const checkOldPassword = await compare(
        old_password,
        checkUserExists.password
      );

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere", 404);
      }

      checkUserExists.password = await hash(password, 8);
    }
    checkUserExists.name = name ?? checkUserExists.name;
    checkUserExists.email = email ?? checkUserExists.email;
    console.log(
      checkUserExists.name,
      checkUserExists.email,
      checkUserExists.password
    );
    await connection("users").where({ id: user_id }).update(
      {
        name: checkUserExists.name,
        email: checkUserExists.email,
        password: checkUserExists.password,
      },
      ["id", "name", "email", "password"]
    );

    return response.status(200).json({ message: "Usuario atualizado" });
  }
}
