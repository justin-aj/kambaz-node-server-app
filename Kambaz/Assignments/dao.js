import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao(db) {
  const createAssignment = (assignment) => {
    const newAssignment = { ...assignment, _id: uuidv4() };
    db.assignments = [...db.assignments, newAssignment];
    return newAssignment;
  };

  const findAssignmentsForCourse = (courseId) => {
    return db.assignments.filter((assignment) => assignment.course === courseId);
  };

  const findAllAssignments = () => db.assignments;

  const findAssignmentById = (assignmentId) => {
    return db.assignments.find((assignment) => assignment._id === assignmentId);
  };

  const updateAssignment = (assignmentId, assignmentUpdates) => {
    const assignment = db.assignments.find((a) => a._id === assignmentId);
    if (assignment) {
      Object.assign(assignment, assignmentUpdates);
      return assignment;
    }
    return null;
  };

  const deleteAssignment = (assignmentId) => {
    db.assignments = db.assignments.filter((assignment) => assignment._id !== assignmentId);
    return { status: "ok" };
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
