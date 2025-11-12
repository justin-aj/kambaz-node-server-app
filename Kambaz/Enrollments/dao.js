import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  const enrollUserInCourse = (userId, courseId) => {
    const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
    db.enrollments.push(newEnrollment);
    return newEnrollment;
  };

  const unenrollUserFromCourse = (userId, courseId) => {
    db.enrollments = db.enrollments.filter(
      (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
    );
    return { status: "ok" };
  };

  const findEnrollmentsForUser = (userId) => {
    return db.enrollments.filter((enrollment) => enrollment.user === userId);
  };

  const findEnrollmentsForCourse = (courseId) => {
    return db.enrollments.filter((enrollment) => enrollment.course === courseId);
  };

  const findAllEnrollments = () => db.enrollments;

  return {
    enrollUserInCourse,
    unenrollUserFromCourse,
    findEnrollmentsForUser,
    findEnrollmentsForCourse,
    findAllEnrollments,
  };
}
