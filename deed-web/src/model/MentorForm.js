import mongoose from "mongoose";

const MentorSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    profession: { type: String },
    workExperience: { type: String },
    currentlyWorkingIn: { type: String },
    about: { type: String },
    photo: { type: String },
    languages: [{ type: String }],
    fieldsOfWork: [{ type: String }],
    expertise: [{ type: String }],

    socialLinks: [
      {
        platform: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],

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

export default mongoose.models.Mentor || mongoose.model("Mentor", MentorSchema);
