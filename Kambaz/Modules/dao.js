import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function ModulesDao() {
  async function createModule(courseId, module) {
    const newModule = { ...module, _id: uuidv4(), course: courseId };
    const created = await model.create(newModule);
    return created;
  }

  async function findModulesForCourse(courseId) {
    const modules = await model.find({ course: courseId });
    console.log("findModulesForCourse: courseId=", courseId, "modules=", modules);
    return modules;
  }

  async function deleteModule(courseId, moduleId) {
    const status = await model.deleteOne({ _id: moduleId, course: courseId });
    return status;
  }

  async function updateModule(courseId, moduleId, moduleUpdates) {
    const status = await model.updateOne(
      { _id: moduleId, course: courseId },
      { $set: moduleUpdates }
    );
    return status;
  }

  return {
    createModule,
    findModulesForCourse,
    deleteModule,
    updateModule,
  };
}