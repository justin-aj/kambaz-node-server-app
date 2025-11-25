import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
import UserModel from "../Users/model.js";

export default function EnrollmentsDao(db) {
  async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId });
    return enrollments.map((enrollment) => enrollment.course);
  }
  async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId });
    const userIds = enrollments.map((enrollment) => enrollment.user);
    const users = await UserModel.find({ _id: { $in: userIds } });
    return users;
  }
  async function findEnrollmentsForUser(userId) {
    return await model.find({ user: userId });
  }
  async function findEnrollmentsForCourse(courseId) {
    return await model.find({ course: courseId });
  }
  async function findAllEnrollments() {
    return await model.find();
  }
  async function enrollUserInCourse(userId, courseId) {
    const existing = await model.findById(`${userId}-${courseId}`);
    if (existing) {
      throw new Error("User is already enrolled in this course.");
    }
    return await model.create({
      user: userId,
      course: courseId,
      _id: `${userId}-${courseId}`,
    });
  }
  function unenrollUserFromCourse(userId, courseId) {
    return model.deleteOne({ user: userId, course: courseId });
  }
  function unenrollAllUsersFromCourse(courseId) {
    return model.deleteMany({ course: courseId });
  }
  return {
    enrollUserInCourse,
    unenrollUserFromCourse,
    findCoursesForUser,
    findUsersForCourse,
    findEnrollmentsForUser,
    findEnrollmentsForCourse,
    findAllEnrollments,
    unenrollAllUsersFromCourse,
  };
}
