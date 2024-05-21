import { ProfileUpdateRequest } from "routes/requests";
import { UserDbModel, User } from "./model";
import { Types, type Document } from "mongoose";
import { Follower } from "./Follower/model";

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

export async function searchForUsers(searchQuery: string) {
  if (searchQuery.length === 0) return [];

  const results = await User.find({
    username: { $regex: searchQuery, $options: "i" },
  });

  // Using the Follower model because this function queries data for the search users screen, so we don't need more data than a Follower
  const users = results.map((userModel) => {
    const follower: Follower = {
      userId: userModel.id,
      username: userModel.username,
    };

    return follower;
  });

  return users;
}

const UserMethods = {
  add: addUser,
  findById: findUserById,
  findByUsername: findUserByUsername,
  search: searchForUsers,
};

export default UserMethods;
