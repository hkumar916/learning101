import mongoose from "mongoose"
import { addCommonVirtuals } from "../helpers/mongoose-plugin.js";

const categorySchema = mongoose.Schema({
  name: {
    type: String
  },
});

categorySchema.plugin(addCommonVirtuals)

//module.exports = mongoose.model("Category", categorySchema);
export default mongoose.model("Category", categorySchema);
