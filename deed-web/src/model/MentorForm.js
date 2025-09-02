import mongoose from "mongoose";

const MentorSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    profession: { type: String },
    workExperience: { type: String },
    currentlyWorkingIn: { type: String },
    about: { type: String },

    languages: [{ type: String }],

    fieldsOfWork: [{ type: String }],

    education: [
      {
        level: { type: String },
        subject: { type: String },
        institution: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Mentor ||
  mongoose.model("Mentor", MentorSchema);
