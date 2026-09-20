import mongoose from "mongoose";
const subTaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  priorityLevel: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
});

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    priorityLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subTasks: [subTaskSchema],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

todoSchema.methods.toggleCompleted = function () {
  this.completed = !this.completed;
  return this.save();
};

todoSchema.virtual("subTaskCount").get(function () {
  return this.subTasks.length;
});

export default mongoose.model("Todo", todoSchema);
