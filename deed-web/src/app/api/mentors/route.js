import dbConnect from "@/dbConfig/db";
import Mentor from "@/model/MentorForm";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    console.log("Incoming Body:", body);
    console.log("Social Media:", body.socialLinks);
    const mentor = new Mentor({
      ...body,
      socialLinks: body.socialLinks,
    });
    await mentor.save();

    return Response.json(
      { message: "Mentor registered successfully", mentor },
      { status: 201 }
    );
  } catch (err) {
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
