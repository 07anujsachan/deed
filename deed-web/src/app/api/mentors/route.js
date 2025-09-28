import dbConnect from "@/dbConfig/db";
import Mentor from "@/model/MentorForm";
import cloudinary from "cloudinary";
import { v4 as uuid } from "uuid";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    await dbConnect();

    const formData = await req.formData();

    // Extract fields
    const file = formData.get("photo");
    if (!file || !(file instanceof File)) {
      return Response.json({ error: "Photo is required" }, { status: 400 });
    }

    // Convert File -> Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadRes = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream(
          { folder: "user_uploads", public_id: uuid() },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    // Parse other fields from FormData
    const mentorData = {};
    for (const [key, value] of formData.entries()) {
      if (key !== "photo") {
        try {
          mentorData[key] = JSON.parse(value); // parse JSON fields (arrays, objects)
        } catch {
          mentorData[key] = value; // fallback for strings
        }
      }
    }

    // Save to DB
    const mentor = new Mentor({
      ...mentorData,
      photo: uploadRes.secure_url,
    });
    await mentor.save();

    return Response.json(
      { message: "Mentor registered successfully", mentor },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ Error uploading mentor:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const mentors = await Mentor.find();
    return Response.json({ mentors });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
