import model from "./model.js";
import { v4 as uuidv4 } from "uuid";
export default function CoursesDao(db) {
  async function findAllCourses() {
    return await model.find();
  }
  async function findCourseById(courseId) {
    return await model.findById(courseId);
  }
  async function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4() };
    return await model.create(newCourse);
  }
  async function updateCourse(courseId, courseUpdates) {
    return await model.updateOne({ _id: courseId }, { $set: courseUpdates });
  }
  async function deleteCourse(courseId) {
    return await model.deleteOne({ _id: courseId });
  }

  return {
    findAllCourses,
    findCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
  };
}
