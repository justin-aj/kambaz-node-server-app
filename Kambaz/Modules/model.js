import mongoose from "mongoose";
import moduleSchema from "./schema.js";
const model = mongoose.model("ModuleModel", moduleSchema, "modules");
export default model;