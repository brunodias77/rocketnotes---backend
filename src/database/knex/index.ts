import kenxConfig from "../../../knexfile";
import { knex } from "knex";

export const connection = knex(kenxConfig.development);
