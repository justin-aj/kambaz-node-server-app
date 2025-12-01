import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
export default function UsersDao(db) {
  const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    return model.create(newUser);
  }

  const findUsersByPartialName = (partialName) => {
    const parts = partialName.trim().split(/\s+/);
    if (parts.length >= 2) {
      // If two or more words, match first word to firstName and second to lastName (or vice versa)
      const firstRegex = new RegExp(parts[0], "i");
      const secondRegex = new RegExp(parts[1], "i");
      return model.find({
        $or: [
          { firstName: { $regex: firstRegex }, lastName: { $regex: secondRegex } },
          { firstName: { $regex: secondRegex }, lastName: { $regex: firstRegex } },
        ],
      });
    }
    // Single word: match against firstName or lastName
    const regex = new RegExp(partialName, "i");
    return model.find({
      $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
    });
  };

  const findUsersByRole = (role) => model.find({ role: role }); // or just model.find({ role })
  const findAllUsers = async () => await model.find();
  const findUserById = (userId) => model.findById(userId);
  const findUserByUsername = async (username) => await model.findOne({ username: username });
  const findUserByCredentials = async (username, password) => await model.findOne({ username, password });
  const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });
  const deleteUser = (userId) => model.findByIdAndDelete( userId );
  return {
    createUser,
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    updateUser,
    deleteUser,
    findUsersByRole,
    findUsersByPartialName
  };
}
