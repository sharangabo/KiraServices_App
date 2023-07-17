import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const HospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: String,
    location: String,
    status: String,
    services: {
      type: Array,
      default: [],
    },
    ratingsAverage: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

HospitalSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

HospitalSchema.methods.passwordsMatches = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const Hospital = mongoose.model("hospitals", HospitalSchema);

export default Hospital;
