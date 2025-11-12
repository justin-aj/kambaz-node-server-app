import EnrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  // Enroll a user in a course
  const enrollUserInCourse = (req, res) => {
    const { userId, courseId } = req.params;
    const enrollment = dao.enrollUserInCourse(userId, courseId);
    res.json(enrollment);
  };

  // Unenroll a user from a course
  const unenrollUserFromCourse = (req, res) => {
    const { userId, courseId } = req.params;
    const status = dao.unenrollUserFromCourse(userId, courseId);
    res.json(status);
  };

  // Get all enrollments for a user
  const findEnrollmentsForUser = (req, res) => {
    const { userId } = req.params;
    const enrollments = dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  };

  // Get all enrollments for a course
  const findEnrollmentsForCourse = (req, res) => {
    const { courseId } = req.params;
    const enrollments = dao.findEnrollmentsForCourse(courseId);
    res.json(enrollments);
  };

  // Get all enrollments
  const findAllEnrollments = (req, res) => {
    const enrollments = dao.findAllEnrollments();
    res.json(enrollments);
  };

  // Register routes
  app.post("/api/enrollments/:userId/:courseId", enrollUserInCourse);
  app.delete("/api/enrollments/:userId/:courseId", unenrollUserFromCourse);
  app.get("/api/enrollments/user/:userId", findEnrollmentsForUser);
  app.get("/api/enrollments/course/:courseId", findEnrollmentsForCourse);
  app.get("/api/enrollments", findAllEnrollments);
}
