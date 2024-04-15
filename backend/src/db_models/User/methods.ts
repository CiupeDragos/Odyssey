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
    realName: userModel.realName,
    birthTimestamp: userModel.birthTimestamp,
    country: userModel.country,
    password: userModel.password,
    visitedCountries: userModel.visitedCountries,
    favoriteCountry: userModel.favoriteCountry,
    profileDescription: userModel.profileDescription,
    followers: userModel.followers,
    following: userModel.following,
  };

  return user;
}

const UserMethods = {
  add: addUser,
  findByUsername: findUserByUsername,
};

export default UserMethods;
