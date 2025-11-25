import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
export default function UsersDao(db) {
  const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    return model.create(newUser);
  }

  const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
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
