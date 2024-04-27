import { ProfileUpdateRequest } from "routes/requests";
import { UserDbModel, User } from "./model";
import { Types, type Document } from "mongoose";

//Type alias for the mongoose User table query response
type UserModel =
  | (Document<unknown, {}, UserDbModel> &
      UserDbModel & {
        _id: Types.ObjectId;
      })
  | null;

export async function addUser(userDbModel: UserDbModel): Promise<string> {
  const newUser = await new User(userDbModel).save();

  return newUser._id.toString();
}

export async function findUserByUsername(
  username: string
): Promise<User | null> {
  const userModel = await User.findOne({ username: username });

  return getUserFromModel(userModel);
}

export async function findUserById(userId: string): Promise<User | null> {
  const userModel = await User.findById(userId);

  return getUserFromModel(userModel);
}

function getUserFromModel(userModel: UserModel): User | null {
  if (!userModel) return null;

  const user: User = {
    id: userModel.id,
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

export function updateUserProfileData(data: ProfileUpdateRequest) {
  return User.findByIdAndUpdate(data.userId, {
    country: data.country,
    favoriteCountry: data.favoriteCountry,
    visitedCountries: data.visitedCountries,
    profileDescription: data.description,
  });
}

export async function updateFollowers(fromUser: User, toUser: User) {
  const fromUpdate = await User.findByIdAndUpdate(fromUser.id, {
    following: fromUser.following,
  });
  const toUpdate = await User.findByIdAndUpdate(toUser.id, {
    followers: toUser.followers,
  });

  return fromUpdate != null && toUpdate != null;
}

const UserMethods = {
  add: addUser,
  findById: findUserById,
  findByUsername: findUserByUsername,
};

export default UserMethods;
