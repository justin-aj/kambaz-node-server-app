import mongoose from "mongoose";
import assignmentSchema from "./schema.js";
const AssignmentModel = mongoose.model("Assignment", assignmentSchema);
export default AssignmentModel;