import { UserDbModel, User } from "./model";

export async function addUser(userDbModel: UserDbModel): Promise<string> {
  const newUser = await new User(userDbModel).save();

  return newUser._id.toString();
}

export async function findUserByUsername(
  username: string
): Promise<User | null> {
  const userModel = await User.findOne({ username: username });

  if (!userModel) return null;

  const user: User = {
    id: userModel._id.toString(),
    username: userModel.username,
    password: userModel.password,
  };

  return user;
}

const UserMethods = {
  add: addUser,
  findByUsername: findUserByUsername,
};

export default UserMethods;
