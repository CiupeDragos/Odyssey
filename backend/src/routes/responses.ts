import { User } from "db_models/User/model";

export type UserData = Omit<User, "password">;
