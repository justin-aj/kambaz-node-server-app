import mongoose from "mongoose";
const moduleSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    course: { type: String, required: true }
  },
  { collection: "modules" }
);

export default moduleSchema;