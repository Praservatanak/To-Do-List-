import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import bycrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },

    age: {
      type: Number,
      min: [0, "Age must be positive"],
      max: [120, "Age must be realistic"],
      default: 18,
    },

    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be longer than 8 characters"],
      maxlength: [20, "Password must be shorter than 20 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    refreshToken: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bycrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bycrypt.compare(candidatePassword, this.password);
};
userSchema.plugin(mongoosePaginate);
const userModel = mongoose.model("User", userSchema);
export default userModel;
