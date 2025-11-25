import AssignmentModel from "./model.js";

export default function AssignmentsDao(db) {
  const createAssignment = async (assignment) => {
    const newAssignment = new AssignmentModel(assignment);
    await newAssignment.save();
    return newAssignment;
  };

  const findAssignmentsForCourse = async (courseId) => {
    return await AssignmentModel.find({ course: courseId });
  };

  const findAllAssignments = async () => db.assignments;

  const findAssignmentById = async (assignmentId) => {
    return await AssignmentModel.findById(assignmentId);
  };

  const updateAssignment = async (assignmentId, assignmentUpdates) => {
    return await AssignmentModel.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });
  };

  const deleteAssignment = async (assignmentId) => {
    return await AssignmentModel.deleteOne({ _id: assignmentId });
  };

  return {
    createAssignment,
    findAssignmentsForCourse,
    findAllAssignments,
    findAssignmentById,
    updateAssignment,
    deleteAssignment,
  };
}
