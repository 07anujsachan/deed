import dbConnect from "@/dbConfig/db.js";
import User from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    
    await dbConnect();
    const { email, password, username } = await req.json();

    if (!email || !password || !username)  {
      return Response.json({ error: "All fields are required" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword , username});
    await user.save();

    return Response.json({ message: "User registered successfully" }, { status: 201 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
