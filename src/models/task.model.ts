import mongoose, { Document, Schema } from "mongoose";

export interface Itask extends Document {
  title: string;
  description: string;
  status: "pending" | "in-progress" | "complete";
  dueDate: Date;
  assignedTo: Schema.Types.ObjectId;
}

const taskSchema = new Schema<Itask>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "complete"],
    default: "pending",
  },
  dueDate: {
    type: Date,
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Task", taskSchema);
