import mongoose from "mongoose";
const enrollmentSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    course: { type: String, required: true },
    user: { type: String, required: true },
    status: { type: String, default: "ENROLLED" }
  },
  { collection: "enrollments" }
);

export default enrollmentSchema;